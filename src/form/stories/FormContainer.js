// @flow
import React, { Component } from 'react';
import { DateTime } from 'luxon';

import Form from '..';
import { schema, uiSchema } from './constants/dataSchemas';
import { getEntityAddressKey, INDEX_MAPPERS } from '../../utils/DataProcessingUtils';
import { ASSOCIATION_ENTITY_SET_NAMES, ENTITY_SET_NAMES, PROPERTY_TYPE_FQNS } from './constants/mockFQNs';

const { INCLUDES_ESN } = ASSOCIATION_ENTITY_SET_NAMES;
const { TASK_LIST_ESN, TASK_ESN } = ENTITY_SET_NAMES;
const { NAME_FQN, DESCRIPTION_FQN, COMPLETED_DT_FQN } = PROPERTY_TYPE_FQNS;

type Props = {

};

type State = {
  formData :Object
};

class FormContainer extends Component<Props, State> {

  getEntityMappers = () => {
    const indexMutator = (i :number) :number => i + 1;

    const indexMappers = {
      [getEntityAddressKey(-1, TASK_ESN, NAME_FQN)]: indexMutator,
      [getEntityAddressKey(-1, TASK_ESN, DESCRIPTION_FQN)]: indexMutator
    };

    return { [INDEX_MAPPERS]: indexMappers };
  }

  getAssociations = () => {
    const taskListEKID :string = '00000000-0000-0000-0000-000000000000';
    const nowAsIsoString :string = DateTime.local().toString();
    return [
      [INCLUDES_ESN, taskListEKID, TASK_LIST_ESN, 0, TASK_ESN, {
        [COMPLETED_DT_FQN]: [nowAsIsoString]
      }]
    ];
  }

  handleSubmit = ({ formData } :Object) => {
    console.log(formData);
  }

  render() {
    return (
      <Form
          schema={schema}
          onSubmit={this.handleSubmit}
          uiSchema={uiSchema} />
    );
  }
}

export default FormContainer;
