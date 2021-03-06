export const schema = {
  type: 'object',
  title: 'Number fields & widgets',
  properties: {
    number: {
      title: 'Number',
      type: 'number'
    },
    integer: {
      title: 'Integer',
      type: 'integer'
    },
    integerMinMax: {
      title: 'Integer (0-99)',
      type: 'integer',
      minimum: 0,
      maximum: 99,
    },
    numberEnum: {
      type: 'number',
      title: 'Number enum',
      enum: [
        1,
        2,
        3
      ]
    },
    numberEnumRadio: {
      type: 'number',
      title: 'Number enum',
      enum: [
        1,
        2,
        3
      ]
    },
  }
};

export const uiSchema = {
  classNames: 'column-span-12 grid-container',
  number: {
    classNames: 'column-span-12',
  },
  numberEnum: {
    classNames: 'column-span-12'
  },
  integer: {
    classNames: 'column-span-12',
    'ui:widget': 'updown'
  },
  integerMinMax: {
    classNames: 'column-span-12',
    'ui:widget': 'updown'
  },
  numberEnumRadio: {
    classNames: 'column-span-12',
    'ui:widget': 'radio'
  }
};
