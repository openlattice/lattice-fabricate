// @flow

const schema = {
  title: 'Files',
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'data-url',
      title: 'Single file'
    },
    files: {
      type: 'array',
      title: 'Multiple files',
      items: {
        type: 'string',
        format: 'data-url'
      }
    },
    filesAccept: {
      type: 'string',
      format: 'data-url',
      title: 'Single File with Accept attribute'
    }
  }
};

const uiSchema = {
  file: {
    classNames: 'column-span-12',
  },
  files: {
    classNames: 'column-span-12',
  },
  filesAccept: {
    classNames: 'column-span-12',
    'ui:options': {
      accept: '.pdf'
    }
  }
};

export {
  schema,
  uiSchema
};
