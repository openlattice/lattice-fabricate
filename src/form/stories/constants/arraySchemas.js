export const schema = {
  type: 'object',
  title: 'Task List',
  properties: {
    tasks: {
      title: 'Tasks',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          taskName: {
            type: 'string',
            title: 'Task Name',
            default: ''
          },
          taskDescription: {
            type: 'string',
            title: 'Task Description',
            default: ''
          }
        }
      },
      default: [{
        taskName: '',
        taskDescription: ''
      }]
    },
  }
};

export const uiSchema = {
  tasks: {
    classNames: 'column-span-12',
    items: {
      classNames: 'grid-container',
      taskName: {
        classNames: 'column-span-12'
      },
      taskDescription: {
        classNames: 'column-span-12',
        'ui:widget': 'textarea'
      }
    }
  }
};
