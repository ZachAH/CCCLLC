import { createClient } from '@sanity/client';

export const client = createClient({
  // Adding the "|| ''" prevents TypeScript from complaining about undefined values
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-03-11',
});

export const GET_PRODUCTS = `*[_type == "product"]{
  _id,
  name,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  "backImageUrl": backImage.asset->url,
  price,
  description,
  category,
  inStock,
  stripePriceId,
  variants[]{
    variantName,
    "variantImage": variantImage.asset->url,
    variantPriceId,
    variantInStock
  }
}`;