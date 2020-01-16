const dataSchema = {
  type: 'object',
  title: 'Signature',
  properties: {
    signature: {
      title: 'Signature',
      type: 'string',
    },
  },
};

const uiSchema = {
  classNames: 'column-span-12',
  signature: {
    classNames: 'column-span-12',
    'ui:widget': 'SignatureWidget',
  },
};

export {
  dataSchema,
  uiSchema,
};
