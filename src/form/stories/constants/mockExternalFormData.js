// @flow

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

const mockExternalFormData = {
  [getPageSectionKey(1, 1)]: [
    {
      [getEntityAddressKey(-1, TASK_ESN, NAME_FQN)]: 123,
      [getEntityAddressKey(-1, TASK_ESN, DESCRIPTION_FQN)]: undefined,
      [getEntityAddressKey(-1, TASK_ESN, INDEX_FQN)]: 0
    },
    {
      [getEntityAddressKey(-1, TASK_ESN, NAME_FQN)]: 456,
      [getEntityAddressKey(-1, TASK_ESN, DESCRIPTION_FQN)]: undefined,
      [getEntityAddressKey(-1, TASK_ESN, INDEX_FQN)]: 1
    }
  ]
};

export default mockExternalFormData;
