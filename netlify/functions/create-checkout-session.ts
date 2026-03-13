import Stripe from 'stripe';
import { createClient } from '@sanity/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// Initialize Sanity client to fetch "Source of Truth" prices
const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || '',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: false, // We want the most up-to-date prices
  apiVersion: '2024-03-11',
});

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ message: 'Method Not Allowed' }) 
    };
  }

  try {
    const { cartItems } = JSON.parse(event.body);

    // 1. Get all the IDs from the cart to fetch them from Sanity in one go
    const ids = cartItems.map(item => item._id);

    // 2. Fetch the LATEST data from Sanity for these items
    const sanityProducts = await sanityClient.fetch(
      `*[_id in $ids]{ _id, name, price, "imageUrl": image.asset->url }`,
      { ids }
    );

    // 3. Map the cart items to Stripe line items using Sanity's prices
    const line_items = cartItems.map((cartItem) => {
      // Find the matching product in our Sanity data
      const officialProduct = sanityProducts.find(p => p._id === cartItem._id);

      if (!officialProduct) {
        throw new Error(`Product not found for ID: ${cartItem._id}`);
      }

      // Check for variant/size and trim
      // If both are missing, this results in an empty string
      const descriptionText = `${cartItem.variantName || ''} ${cartItem.size || ''}`.trim();

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: officialProduct.name,
            images: [officialProduct.imageUrl],
            // FIX: If descriptionText is empty, we pass undefined so Stripe ignores the field
            // Stripe throws a 500 error if description is an empty string ""
            description: descriptionText || undefined,
          },
          // We use officialProduct.price, NOT cartItem.price from the frontend
          unit_amount: Math.round(officialProduct.price * 100), 
        },
        quantity: cartItem.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      shipping_address_collection: { allowed_countries: ['US'] },
      success_url: `${event.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin}/checkout`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (err) {
    console.error('Stripe Session Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};