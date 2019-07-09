// @flow
import React, { Component } from 'react';
import { DateTime } from 'luxon';

import Form from '..';
import { schema, uiSchema } from './constants/dataSchemas';
import {
  processEntityData,
  processAssociationEntityData
} from '../../utils/DataProcessingUtils';
import { ASSOCIATION_ENTITY_SET_NAMES, ENTITY_SET_NAMES, PROPERTY_TYPE_FQNS } from './constants/mockFQNs';
import { entitySetIds, propertyTypeIds } from './constants/mockEDM';

const { INCLUDES_ESN } = ASSOCIATION_ENTITY_SET_NAMES;
const { TASK_LIST_ESN, TASK_ESN } = ENTITY_SET_NAMES;
const { COMPLETED_DT_FQN } = PROPERTY_TYPE_FQNS;

type Props = {

};

type State = {
  formData :Object
};

class FormContainer extends Component<Props, State> {

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

    const entityData = processEntityData(formData, entitySetIds, propertyTypeIds);
    console.log(entityData);
    // const associationData = processAssociationEntityData(this.getAssociations(), entitySetIds, propertyTypeIds);
    // console.log(associationData);
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
