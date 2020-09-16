// @flow
export const schema = {
  type: 'object',
  title: '',
  properties: {
    multipleInput1: {
      type: 'array',
      title: 'Multiple input (ui:options flexOptions: [1, 1])',
      items: {
        type: 'object',
        enum: ['Question 1', 'Question 2', 'Question 3']
      },
      minItems: 1,
      uniqueItems: true
    },
    multipleInput2: {
      type: 'array',
      title: 'Multiple input (ui:options flexOptions: [2, 1])',
      items: {
        type: 'object',
        enum: ['Question 1', 'Question 2', 'Question 3']
      },
      minItems: 1,
      uniqueItems: true
    },
    inputTypeNumber: {
      type: 'array',
      title: 'Multiple input (ui:options inputType: number, flexOptions: [2, 1])',
      items: {
        type: 'number',
        enum: ['Question 1', 'Question 2', 'Question 3']
      },
      minItems: 1,
      uniqueItems: true
    }
  },
  required: ['multipleInput1', 'multipleInput2', 'inputTypeNumber']
};

export const uiSchema = {
  classNames: 'column-span-12 grid-container',
  multipleInput1: {
    classNames: 'column-span-12',
    'ui:widget': 'MultiInputWidget',
  },
  multipleInput2: {
    classNames: 'column-span-12',
    'ui:widget': 'MultiInputWidget',
    'ui:options': {
      flexOptions: [2, 1]
    }
  },
  inputTypeNumber: {
    classNames: 'column-span-12',
    'ui:widget': 'MultiInputWidget',
    'ui:options': {
      flexOptions: [2, 1],
      inputType: 'number'
    }
  }
};
