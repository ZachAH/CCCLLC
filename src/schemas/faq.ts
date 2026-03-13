export default {
    name: 'faq',
    title: 'FAQ',
    type: 'document',
    fields: [
      {
        name: 'question',
        title: 'Question',
        type: 'string',
      },
      {
        name: 'answer',
        title: 'Answer',
        type: 'text',
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        description: 'Use numbers (1, 2, 3) to sort how they appear on the page.'
      }
    ],
  }