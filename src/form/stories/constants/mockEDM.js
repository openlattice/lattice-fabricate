// @flow
import type { FQN } from 'lattice';

import {
  ASSOCIATION_ENTITY_SET_NAMES,
  ENTITY_SET_NAMES,
  PROPERTY_TYPE_FQNS
} from './mockFQNs';

let value = 0;
const UUID_TEMPLATE = '00000000-0000-0000-0000-000000000000';
function mockUUID() {
  value += 1;
  const valueStr = value.toString();
  const fakeUUID = UUID_TEMPLATE.slice(0, UUID_TEMPLATE.length - valueStr.length) + valueStr;
  return fakeUUID;
}

const allEntitySetNames :FQN[] = Object.values(ENTITY_SET_NAMES)
  .concat(Object.values(ASSOCIATION_ENTITY_SET_NAMES));

const entitySetIds = allEntitySetNames.reduce((acc, entitySetNames) => {
  acc[entitySetNames] = mockUUID();
  return acc;
}, {});


const allPropertyTypeFQNs :FQN[] = Object.values(PROPERTY_TYPE_FQNS);
const propertyTypeIds = allPropertyTypeFQNs.reduce((acc, propertyTypeFQN) => {
  acc[propertyTypeFQN] = mockUUID();
  return acc;
}, {});

export {
  entitySetIds,
  propertyTypeIds
};
