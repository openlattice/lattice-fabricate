export const schema = {
  definitions: {
    taskItems: {
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
    }
  },
  type: 'object',
  title: 'Arrays',
  properties: {
    tasks: {
      title: 'Tasks',
      type: 'array',
      items: {
        $ref: '#/definitions/taskItems'
      },
      default: [{
        taskName: '',
        taskDescription: ''
      }]
    },
    unorderable: {
      title: 'Unorderable',
      type: 'array',
      items: {
        $ref: '#/definitions/taskItems'
      },
      default: [{
        taskName: '',
        taskDescription: ''
      }]
    },
    unremovable: {
      title: 'Unremovable',
      type: 'array',
      items: {
        $ref: '#/definitions/taskItems'
      },
      default: [{
        taskName: '',
        taskDescription: ''
      }]
    },
    unindexed: {
      title: 'Without Index',
      type: 'array',
      items: {
        $ref: '#/definitions/taskItems'
      },
      default: [{
        taskName: '',
        taskDescription: ''
      }]
    }
  }
};

export const uiSchema = {
  tasks: {
    classNames: 'column-span-12',
    'ui:options': {
      addButtonText: '+ Add Task'
    },
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
  },
  unorderable: {
    classNames: 'column-span-12',
    'ui:options': {
      addButtonText: '+ Add Task',
      orderable: false
    },
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
  },
  unremovable: {
    classNames: 'column-span-12',
    'ui:options': {
      addButtonText: '+ Add Task',
      removable: false
    },
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
  },
  unindexed: {
    classNames: 'column-span-12',
    'ui:options': {
      addButtonText: '+ Add Task',
      withIndex: false
    },
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
