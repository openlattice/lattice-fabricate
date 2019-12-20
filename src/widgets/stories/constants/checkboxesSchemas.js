export const schema = {
  type: 'object',
  title: 'Checkboxes',
  properties: {
    checkboxes: {
      title: 'Options',
      type: 'array',
      items: {
        type: 'string',
        enum: ['Option 1', 'Option 2', 'Option 3'],
      },
      minItems: 1,
      uniqueItems: true,
    },
    checkboxesOther: {
      title: 'Options (uiOptions flag: withOther)',
      type: 'array',
      items: {
        type: 'string',
        enum: ['Option 1', 'Option 2', 'Option 3'],
      },
      minItems: 1,
      uniqueItems: true,
    },
    checkboxesNone: {
      title: 'Options (uiOptions flag: withNone)',
      type: 'array',
      items: {
        type: 'string',
        enum: ['Option 1', 'Option 2', 'Option 3'],
      },
      minItems: 1,
      uniqueItems: true,
    },
  },
};

export const uiSchema = {
  classNames: 'column-span-12',
  checkboxes: {
    classNames: 'column-span-12',
    'ui:widget': 'checkboxes',
  },
  checkboxesOther: {
    classNames: 'column-span-12',
    'ui:widget': 'checkboxes',
    'ui:options': {
      withOther: true
    }
  },
  checkboxesNone: {
    classNames: 'column-span-12',
    'ui:widget': 'checkboxes',
    'ui:options': {
      withNone: true,
      withOther: true,
    }
  },
};
