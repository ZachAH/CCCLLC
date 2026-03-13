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
          { title: 'Lifestyle & More', value: 'lifestyle' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'isSeasonal',
      title: 'Is this a Seasonal/Special item?',
      type: 'boolean',
      initialValue: false,
      description: 'Enable this to show the product in the "Celebrate the Season" section.',
    },
    {
      name: 'seasonTag',
      title: 'Season Tag',
      type: 'string',
      description: 'Categorize this for specific holidays or events.',
      hidden: ({ document }: any) => !document?.isSeasonal, 
      options: {
        list: [
          { title: 'Easter', value: 'easter' },
          { title: 'Christmas', value: 'christmas' },
          { title: 'Fall/Autumn', value: 'fall' },
          { title: 'Summer', value: 'summer' },
          { title: 'Mother/Father Day', value: 'parent-day' },
        ],
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
    // --- UPDATED DESCRIPTION FIELD ---
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      description: 'Use Bullet Points or Bold text to make scent lists easier to read.',
      of: [{ type: 'block' }],
      validation: (Rule: any) => Rule.required().min(1).error('A description is required for Stripe checkout.'),
    },
    // ---------------------------------
    {
      name: 'isCustomizable',
      title: 'Allow Customization?',
      type: 'boolean',
      initialValue: false,
      description: 'Enable this to allow customers to pick their own garment color and style.',
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