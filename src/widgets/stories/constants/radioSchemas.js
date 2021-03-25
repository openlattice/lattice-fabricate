export const schema = {
  type: 'object',
  title: 'radio',
  properties: {
    radio: {
      title: 'Options',
      type: 'string',
      description: 'Select one',
      enum: ['Option 1', 'Option 2', 'Option 3'],
    },
    radioOther: {
      title: 'ui:widget: OtherRadioWidget',
      type: 'array',
      items: {
        type: 'string',
        enum: ['Option 1', 'Option 2', 'Option 3'],
      },
      uniqueItems: true,
    },
    radioNone: {
      title: 'Options (ui:options flag: withNone)',
      type: 'string',
      description: 'Select one',
      enum: ['Option 1', 'Option 2', 'Option 3'],
    },

    radioOtherText: {
      title: 'Options (ui:options flag: withOther, otherText)',
      type: 'array',
      description: 'Select one',
      items: {
        type: 'string',
        enum: ['Option 1', 'Option 2', 'Option 3']
      },
      uniqueItems: true
    },
    radioButtons: {
      title: 'Button (ui:options mode = \'button\')',
      type: 'string',
      description: 'Select one',
      enum: ['Option 1', 'Option 2', 'Option 3'],
    },
  },
};

export const uiSchema = {
  classNames: 'column-span-12',
  radio: {
    classNames: 'column-span-12',
    'ui:widget': 'radio',
  },
  radioOther: {
    classNames: 'column-span-12',
    'ui:widget': 'OtherRadioWidget',
    'ui:options': {
      withNone: true
    }
  },
  radioNone: {
    classNames: 'column-span-12',
    'ui:widget': 'radio',
    'ui:options': {
      withNone: true,
      withOther: true,
    }
  },
  radioOtherText: {
    classNames: 'column-span-12',
    'ui:widget': 'OtherRadioWidget',
    'ui:options': {
      withOther: true,
      otherText: 'Other/I don\'t know'
    }
  },
  radioButtons: {
    classNames: 'column-span-12',
    'ui:widget': 'radio',
    'ui:options': {
      mode: 'button',
      row: true,
      withNone: true,
    },
  },
};
