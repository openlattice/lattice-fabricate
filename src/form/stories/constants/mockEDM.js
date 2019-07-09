// @flow
import uuid from 'uuid/v4';
import { Models } from 'lattice';
import {
  ASSOCIATION_ENTITY_SET_NAMES,
  ENTITY_SET_NAMES,
  PROPERTY_TYPE_FQNS
} from './mockFQNs';

const { FullyQualifiedName } = Models;


const allEntitySetNames :FullyQualifiedName[] = Object.values(ENTITY_SET_NAMES)
  .concat(Object.values(ASSOCIATION_ENTITY_SET_NAMES));

const entitySetIds = allEntitySetNames.reduce((acc, entitySetNames) => {
  acc[entitySetNames] = uuid();
  return acc;
}, {});


const allPropertyTypeFQNs :FullyQualifiedName[] = Object.values(PROPERTY_TYPE_FQNS);
const propertyTypeIds = allPropertyTypeFQNs.reduce((acc, propertyTypeFQN) => {
  acc[propertyTypeFQN] = uuid();
  return acc;
}, {});

export {
  entitySetIds,
  propertyTypeIds
};
