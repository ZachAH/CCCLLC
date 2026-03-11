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
      },
      {
        name: 'image',
        title: 'Product Image',
        type: 'image',
        options: { hotspot: true }, // This gives her the "focal point" UI
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'price',
        title: 'Price (in USD)',
        type: 'number',
      },
      {
        name: 'stripePriceId',
        title: 'Stripe Price ID',
        type: 'string',
        description: 'The ID from the Stripe Dashboard (e.g., price_123...)',
      }
    ],
  };