import { getEntityAddressKey, getPageSectionKey } from '../../../utils/DataProcessingUtils';
import { ENTITY_SET_NAMES, PROPERTY_TYPE_FQNS } from './mockFQNs';

const {
  TASK_ESN,
} = ENTITY_SET_NAMES;

const {
  NAME_FQN,
  DESCRIPTION_FQN,
  INDEX_FQN
} = PROPERTY_TYPE_FQNS;

export const schema = {
  definitions: {
    taskItems: {
      type: 'object',
      properties: {
        [getEntityAddressKey(-1, TASK_ESN, NAME_FQN)]: {
          type: 'number',
          title: 'Task Name',
        },
        [getEntityAddressKey(-1, TASK_ESN, DESCRIPTION_FQN)]: {
          type: 'string',
          title: 'Task Description',
        },
        [getEntityAddressKey(-1, TASK_ESN, INDEX_FQN)]: {
          type: 'number',
          title: 'Task #',
        }
      },
      required: [getEntityAddressKey(-1, TASK_ESN, NAME_FQN)],
    }
  },
  type: 'object',
  title: 'Arrays',
  properties: {
    [getPageSectionKey(1, 1)]: {
      type: 'array',
      title: 'Tasks',
      items: {
        $ref: '#/definitions/taskItems'
      },
      default: [
        {
          [getEntityAddressKey(-1, TASK_ESN, NAME_FQN)]: 123,
          [getEntityAddressKey(-1, TASK_ESN, DESCRIPTION_FQN)]: undefined,
        },
        {
          [getEntityAddressKey(-1, TASK_ESN, NAME_FQN)]: 456,
          [getEntityAddressKey(-1, TASK_ESN, DESCRIPTION_FQN)]: undefined,
        }
      ]
    }
  }
};

export const uiSchema = {
  [getPageSectionKey(1, 1)]: {
    classNames: 'column-span-12',
    'ui:options': {
      addButtonText: '+ Add Task'
    },
    items: {
      classNames: 'grid-container',
      [getEntityAddressKey(-1, TASK_ESN, NAME_FQN)]: {
        classNames: 'column-span-12'
      },
      [getEntityAddressKey(-1, TASK_ESN, DESCRIPTION_FQN)]: {
        classNames: 'column-span-12',
        'ui:widget': 'textarea'
      },
      [getEntityAddressKey(-1, TASK_ESN, INDEX_FQN)]: {
        classNames: 'column-span-12',
        'ui:widget': 'hidden'
      },
      'ui:options': {
        editable: true
      }
    }
  }
};
