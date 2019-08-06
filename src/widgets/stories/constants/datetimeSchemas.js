
export const schema = {
  type: 'object',
  title: 'Date & Time Widgets',
  properties: {
    date: {
      title: 'Date',
      type: 'string',
      format: 'date'
    }
  }
};

export const uiSchema = {
  classNames: 'column-span-12 grid-container',
  date: {
    classNames: 'column-span-12',
  }
};
