// @flow

import { ENTITY_SET_NAMES, PROPERTY_TYPE_FQNS } from './mockFQNs';

import { getEntityAddressKey, getPageSectionKey } from '../../../utils/DataProcessingUtils';

const {
  TASK_ESN,
} = ENTITY_SET_NAMES;

const {
  DESCRIPTION_FQN,
  INDEX_FQN,
  NAME_FQN,
  TYPE_FQN,
} = PROPERTY_TYPE_FQNS;

const mockExternalFormData = {
  [getPageSectionKey(1, 1)]: [
    {
      [getEntityAddressKey(-1, TASK_ESN, NAME_FQN)]: 123,
      [getEntityAddressKey(-1, TASK_ESN, DESCRIPTION_FQN)]: 'Open',
      [getEntityAddressKey(-1, TASK_ESN, TYPE_FQN)]: ['Push', 'Email'],
      [getEntityAddressKey(-1, TASK_ESN, INDEX_FQN)]: 0
    },
    {
      [getEntityAddressKey(-1, TASK_ESN, NAME_FQN)]: 456,
      [getEntityAddressKey(-1, TASK_ESN, DESCRIPTION_FQN)]: 'Lattice',
      [getEntityAddressKey(-1, TASK_ESN, TYPE_FQN)]: ['None'],
      [getEntityAddressKey(-1, TASK_ESN, INDEX_FQN)]: 1
    }
  ]
};

export default mockExternalFormData;
