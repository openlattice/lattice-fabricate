import { Map } from 'immutable';
import { v4 as uuid } from 'uuid';

import { ENTITY_SET_NAMES } from './mockFQNs';

const { TASK_ESN } = ENTITY_SET_NAMES;

const entityIndexToIdMap = {
  [TASK_ESN]: Map([
    // there are two unique entities in a list where the EAK index of the list is -1
    [-1, [uuid(), uuid()]],
  ])
};


export default entityIndexToIdMap;
