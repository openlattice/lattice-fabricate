import { Models } from 'lattice';

const { FullyQualifiedName } = Models;

const PROPERTY_TYPE_FQNS = {
  NAME_FQN: new FullyQualifiedName('mock.name'),
  DESCRIPTION_FQN: new FullyQualifiedName('mock.description'),
  COMPLETED_DT_FQN: new FullyQualifiedName('mock.completeddatetime')
};

const ENTITY_SET_NAMES = {
  PERSON_ESN: 'mock_person',
  TASK_ESN: 'mock_task',
  TASK_LIST_ESN: 'mock_tasklist'
};

const ASSOCIATION_ENTITY_SET_NAMES = {
  INCLUDES_ESN: 'mock_includes'
};

export {
  ASSOCIATION_ENTITY_SET_NAMES,
  ENTITY_SET_NAMES,
  PROPERTY_TYPE_FQNS,
};
