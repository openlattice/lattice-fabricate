export const schema = {
  type: 'object',
  title: 'Checkboxes',
  properties: {
    checkboxes: {
      title: 'Options',
      type: 'array',
      description: 'Select all that apply',
      items: {
        type: 'string',
        enum: ['Option 1', 'Option 2', 'Option 3'],
      },
      minItems: 1,
      uniqueItems: true,
    },
    checkboxesOther: {
      title: 'Options (ui:options flag: withOther)',
      type: 'array',
      description: 'Select all that apply',
      items: {
        type: 'string',
        enum: ['Option 1', 'Option 2', 'Option 3'],
      },
      minItems: 1,
      uniqueItems: true,
    },
    checkboxesNone: {
      title: 'Options (ui:options flag: withNone)',
      type: 'array',
      description: 'Select all that apply',
      items: {
        type: 'string',
        enum: ['Option 1', 'Option 2', 'Option 3'],
      },
      minItems: 1,
      uniqueItems: true,
    },
    checkboxesNoneText: {
      title: 'Options (ui:options flag: withNone + noneText)',
      type: 'array',
      description: 'Select all that apply',
      items: {
        type: 'string',
        enum: ['Option 1', 'Option 2', 'Option 3'],
      },
      minItems: 1,
      uniqueItems: true,
    },
    checkboxButtons: {
      title: 'Button (ui:options mode = \'button\')',
      type: 'array',
      description: 'Select all that apply',
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
  checkboxesNoneText: {
    classNames: 'column-span-12',
    'ui:widget': 'checkboxes',
    'ui:options': {
      withNone: true,
      withOther: true,
      noneText: "I don't know"
    }
  },
  checkboxButtons: {
    classNames: 'column-span-12',
    'ui:widget': 'checkboxes',
    'ui:options': {
      mode: 'button',
      row: true,
      withNone: true,
      withOther: true,
    }
  },
};
