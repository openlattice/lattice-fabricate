export const schema = {
  type: 'object',
  title: 'Markdown Widget',
  properties: {
    section: {
      type: 'object',
      title: 'Organization',
      properties: {
        markdownDescription: {
          type: 'string',
          title: 'Description'
        }
      },
      required: ['markdownDescription']
    }
  }
};

export const uiSchema = {
  section: {
    classNames: 'column-span-12 grid-container',
    markdownDescription: {
      classNames: 'column-span-12',
      'ui:widget': 'MarkdownEditorWidget'
    }
  }
};
