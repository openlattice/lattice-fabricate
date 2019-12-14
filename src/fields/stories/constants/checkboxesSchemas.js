export const schema = {
  type: 'object',
  title: 'CheckboxListField',
  properties: {
    checkboxes: {
      title: 'Options',
      type: 'array',
      items: {
        type: 'string',
        enum: ['Option 1', 'Option 2', 'Option 3', 'Other'],
      },
      minItems: 1,
      uniqueItems: true
    },
  },
};

export const uiSchema = {
  classNames: 'column-span-12',
  checkboxes: {
    classNames: 'column-span-12',
    'ui:field': 'CheckboxListField',
    'ui:options': {
      withOther: true
    }
  }
};