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

import type { EdgeDefinition } from '../../utils/DataProcessingUtils';

const { INCLUDES_ESN } = ASSOCIATION_ENTITY_SET_NAMES;
const { TASK_LIST_ESN, TASK_ESN } = ENTITY_SET_NAMES;
const { COMPLETED_DT_FQN } = PROPERTY_TYPE_FQNS;

type Props = {
  submitAction :(any) => void;
};

type State = {
  formData :Object
};

class FormContainer extends Component<Props, State> {

  getAssociations = () :EdgeDefinition[] => {
    const taskListEKID :string = '00000000-0000-0000-0000-000000000000';
    const nowAsIsoString :string = DateTime.local().toString();
    return [
      [INCLUDES_ESN, taskListEKID, TASK_LIST_ESN, 0, TASK_ESN, {
        [COMPLETED_DT_FQN]: [nowAsIsoString]
      }]
    ];
  }

  handleOnChange = ({formData}) => {
    console.log(formData);
  }

  handleSubmit = ({ formData } :Object) => {
    const { submitAction } = this.props;
    const entityData = processEntityData(formData, entitySetIds, propertyTypeIds);
    const associationData = processAssociationEntityData(this.getAssociations(), entitySetIds, propertyTypeIds);
    submitAction({ entityData, associationData });
  }

  render() {
    return (
      <Form
          disabled
          schema={schema}
          onSubmit={this.handleSubmit}
          onChange={this.handleOnChange}
          uiSchema={uiSchema} />
    );
  }
}

export default FormContainer;
