export const schema = {
  definitions: {
    taskItems: {
      type: 'object',
      properties: {
        taskName: {
          type: 'number',
          title: 'Task Name',
        },
        taskDescription: {
          type: 'string',
          title: 'Task Description',
        }
      },
      required: ['taskName']
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
      default: [{}]
    },
    unorderable: {
      title: 'Unorderable',
      type: 'array',
      items: {
        $ref: '#/definitions/taskItems'
      },
      default: [{}]
    },
    unremovable: {
      title: 'Unremovable',
      type: 'array',
      items: {
        $ref: '#/definitions/taskItems'
      },
      default: [{}]
    },
    unindexed: {
      title: 'Without Index',
      type: 'array',
      items: {
        $ref: '#/definitions/taskItems'
      },
      default: [{}]
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
      showIndex: false
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
