import { createClient } from '@sanity/client';

export const client = createClient({
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
  isSeasonal,
  seasonTag,
  isCustomizable,
  stripePriceId,
  variants[]{
    variantName,
    "variantImage": variantImage.asset->url,
    variantPriceId,
    variantInStock
  }
}`;

export const GET_SEASONAL_PRODUCTS = `*[_type == "product" && isSeasonal == true]{
  _id,
  name,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  "backImageUrl": backImage.asset->url,
  price,
  seasonTag,
  inStock,
  isSeasonal,
  isCustomizable,
  category,
  stripePriceId,
  variants[]{
    variantName,
    "variantImage": variantImage.asset->url,
    variantPriceId,
    variantInStock
  }
}`;

export const GET_PRODUCT_BY_SLUG = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  "backImageUrl": backImage.asset->url,
  price,
  description,
  category,
  inStock,
  isSeasonal,
  seasonTag,
  isCustomizable,
  stripePriceId,
  variants[]{
    variantName,
    "variantImage": variantImage.asset->url,
    variantPriceId,
    variantInStock
  }
}`;