export const schema = {
  type: 'object',
  title: 'Select',
  properties: {
    select: {
      title: 'Select',
      type: 'string',
      enum: ['Option 1', 'Option 2', 'Option 3', 'Other'],
    },
    multiple: {
      title: 'Multiple Select',
      type: 'array',
      items: {
        type: 'string',
        enum: ['Option 1', 'Option 2', 'Option 3', 'Other'],
      },
      uniqueItems: true,
    },
    creatable: {
      type: 'array',
      title: 'Creatable',
      items: {
        type: 'string',
        enum: [''],
      },
      uniqueItems: true,
    },
  },
};

export const uiSchema = {
  classNames: 'column-span-12',
  select: {
    classNames: 'column-span-12',
  },
  multiple: {
    classNames: 'column-span-12',
    'ui:options': {
      multiple: true,
    },
  },
  creatable: {
    classNames: 'column-span-12',
    'ui:options': {
      creatable: true,
      multiple: true,
      noOptionsMessage: 'Type to create',
    }
  },
};
