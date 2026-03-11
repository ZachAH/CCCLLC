// src/lib/sanity.ts
import { createClient } from '@sanity/client';

export const client = createClient({
  // Vite uses import.meta.env instead of process.env
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-03-11',
});

export const GET_PRODUCTS = `*[_type == "product"]{
  _id,
  name,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  price,
  stripePriceId
}`;