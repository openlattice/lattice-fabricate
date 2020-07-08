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
    customDate: {
      title: 'Date with Custom Props',
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
    customTime: {
      title: 'Time with Custom Props',
      type: 'string',
      format: 'time',
      description: '\'ui:widget\': \'TimeWidget\' in uiSchema'
    },
    datetime: {
      title: 'Date & Time',
      type: 'string',
      format: 'date-time',
      description: '"format: \'date-time\'" in schema, OR "\'ui:widget\': \'DateTimeWidget\'" in uiSchema'
    },
    customDatetime: {
      title: 'Date & Time with Custom Props',
      type: 'string',
      format: 'date-time',
      description: '"format: \'date-time\'" in schema, OR "\'ui:widget\': \'DateTimeWidget\'" in uiSchema'
    },
  },
  required: ['date', 'time']
};

export const uiSchema = {
  classNames: 'column-span-12 grid-container',
  date: {
    classNames: 'column-span-12',
    'ui:widget': 'DateWidget',
  },
  customDate: {
    classNames: 'column-span-12',
    'ui:widget': 'DateWidget',
    'ui:options': {
      format: 'yyyy/MM/dd',
      mask: '____/__/__',
      placeholder: 'YYYY/MM/DD'
    }
  },
  time: {
    classNames: 'column-span-12',
    'ui:widget': 'TimeWidget',
  },
  customTime: {
    classNames: 'column-span-12',
    'ui:widget': 'TimeWidget',
    'ui:options': {
      ampm: false,
      format: 'HH:mm',
      mask: '__:__',
      placeholder: 'HH:MM'
    }
  },
  datetime: {
    classNames: 'column-span-12',
    'ui:widget': 'DateTimeWidget',
  },
  customDatetime: {
    classNames: 'column-span-12',
    'ui:widget': 'DateTimeWidget',
    'ui:options': {
      format: 'MM/dd/yy HH:mm',
      mask: '__/__/__ __:__',
      placeholder: 'MM/DD/YY HH:MM'
    }
  }
};
