// @flow
import React, { Component } from 'react';
import { DateTime } from 'luxon';
import { action } from '@storybook/addon-actions';

import Form from '..';
import { schema, uiSchema } from './constants/dataSchemas';
import {
  processEntityData,
  processAssociationEntityData
} from '../../utils/DataProcessingUtils';
import { ASSOCIATION_ENTITY_SET_NAMES, ENTITY_SET_NAMES, PROPERTY_TYPE_FQNS } from './constants/mockFQNs';
import { entitySetIds, propertyTypeIds } from './constants/mockEDM';
import entityAddressToIdMap from './constants/entityAddressToIdMap';
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

  handleSubmit = ({ formData } :Object) => {
    const { submitAction } = this.props;
    const entityData = processEntityData(formData, entitySetIds, propertyTypeIds);
    const associationData = processAssociationEntityData(this.getAssociations(), entitySetIds, propertyTypeIds);
    submitAction({ entityData, associationData });
  }

  render() {
    const formContext = {
      editAction: action('Submitting data for partialReplace'),
      entityAddressToIdMap,
      entitySetIds,
      mappers: {},
      propertyTypeIds,
    };

    return (
      <Form
          disabled
          schema={schema}
          formContext={formContext}
          onSubmit={this.handleSubmit}
          uiSchema={uiSchema} />
    );
  }
}

export default FormContainer;
