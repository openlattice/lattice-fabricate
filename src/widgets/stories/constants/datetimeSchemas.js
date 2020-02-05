
export const schema = {
  type: 'object',
  title: 'Date & Time Widgets',
  properties: {
    date: {
      title: 'Date',
      type: 'string',
      format: 'date',
      description: '"format: \'date\'" in schema, OR "\'ui:widget\': \'DateWidget\'" in uiSchema'
    },
    time: {
      title: 'Time',
      type: 'string',
      format: 'time',
      description: '\'ui:widget\': \'TimeWidget\' in uiSchema'
    },
    datetime: {
      title: 'Date & Time',
      type: 'string',
      format: 'date-time',
      description: '"format: \'date-time\'" in schema, OR "\'ui:widget\': \'DateTimeWidget\'" in uiSchema'
    }
  },
  required: ['date', 'time']
};

export const uiSchema = {
  classNames: 'column-span-12 grid-container',
  date: {
    classNames: 'column-span-12',
    'ui:widget': 'DateWidget'
  },
  time: {
    classNames: 'column-span-12',
    'ui:widget': 'TimeWidget',
  },
  datetime: {
    classNames: 'column-span-12',
    'ui:widget': 'DateTimeWidget',
  }
};
