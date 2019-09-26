
export const schema = {
  type: 'object',
  title: 'Date & Time Widgets',
  properties: {
    date: {
      title: 'Date',
      type: 'string',
      format: 'date'
    },
    time: {
      title: 'Time',
      type: 'string',
    }
  }
};

export const uiSchema = {
  classNames: 'column-span-12 grid-container',
  date: {
    classNames: 'column-span-12',
  },
  time: {
    classNames: 'column-span-12',
    'ui:widget': 'TimeWidget',
  }
};
