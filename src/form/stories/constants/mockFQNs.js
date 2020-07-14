import { Models } from 'lattice';

const { FQN } = Models;

const PROPERTY_TYPE_FQNS = {
  COMPLETED_DT_FQN: FQN.of('mock.completeddatetime'),
  DESCRIPTION_FQN: FQN.of('mock.description'),
  IMAGE_DATA_FQN: FQN.of('mock.imagedata'),
  INDEX_FQN: FQN.of('mock.index'),
  NAME_FQN: FQN.of('mock.name'),
  TYPE_FQN: FQN.of('mock.type'),
};

const ENTITY_SET_NAMES = {
  IMAGE_ESN: 'mock_image',
  PERSON_ESN: 'mock_person',
  TASK_ESN: 'mock_task',
  TASK_LIST_ESN: 'mock_tasklist',
};

const ASSOCIATION_ENTITY_SET_NAMES = {
  INCLUDES_ESN: 'mock_includes'
};

export {
  ASSOCIATION_ENTITY_SET_NAMES,
  ENTITY_SET_NAMES,
  PROPERTY_TYPE_FQNS,
};
