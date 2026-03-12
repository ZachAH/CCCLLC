export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'T-Shirts', value: 't-shirts' },
          { title: 'Hoodies/Crewnecks', value: 'hoodies/crewnecks' },
          { title: 'Hats', value: 'hats' },
          { title: 'Bracelets', value: 'bracelets' },
          { title: 'Candles', value: 'candles' },
          { title: 'Lifestyle & More', value: 'lifestyle' }, // The "Catch-all"
        ],
        layout: 'radio',
      },
    },
    {
      name: 'image',
      title: 'Main Product Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'backImage',
      title: 'Back Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'price',
      title: 'Price (in USD)',
      type: 'number',
      validation: (Rule: any) => Rule.min(0),
    },
    {
      name: 'inStock',
      title: 'Global Stock Status',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to mark the entire product as Sold Out',
    },
    {
      name: 'stripePriceId',
      title: 'Default Stripe Price ID',
      type: 'string',
      description: 'Use this for products WITHOUT variants (e.g., a one-size hat)',
    },
    {
      name: 'variants',
      title: 'Product Variants (Colors/Sizes)',
      type: 'array',
      description: 'Add color variants here if applicable',
      of: [
        {
          type: 'object',
          name: 'variant',
          fields: [
            { name: 'variantName', title: 'Variant Name (e.g. Blue, Small)', type: 'string' },
            { name: 'variantImage', title: 'Variant Specific Image', type: 'image', options: { hotspot: true } },
            { name: 'variantPriceId', title: 'Variant Stripe Price ID', type: 'string' },
            { name: 'variantInStock', title: 'In Stock', type: 'boolean', initialValue: true },
          ],
        },
      ],
    },
  ],
};