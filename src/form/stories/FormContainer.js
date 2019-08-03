// @flow
import React, { Component } from 'react';
import { DateTime } from 'luxon';
import { action } from '@storybook/addon-actions';
import { get, setIn } from 'immutable';

import { schema, uiSchema } from './constants/dataSchemas';
import {
  getEntityAddressKey,
  getPageSectionKey,
  processAssociationEntityData,
  processEntityData,
} from '../../utils/DataProcessingUtils';
import { ASSOCIATION_ENTITY_SET_NAMES, ENTITY_SET_NAMES, PROPERTY_TYPE_FQNS } from './constants/mockFQNs';
import { entitySetIds, propertyTypeIds } from './constants/mockEDM';
import mockExternalFormData from './constants/mockExternalFormData';
import entityIndexToIdMap from './constants/entityIndexToIdMap';
import type { EdgeDefinition } from '../../utils/DataProcessingUtils';
import Form from '..';

const { INCLUDES_ESN } = ASSOCIATION_ENTITY_SET_NAMES;
const { TASK_LIST_ESN, TASK_ESN } = ENTITY_SET_NAMES;
const { COMPLETED_DT_FQN, INDEX_FQN } = PROPERTY_TYPE_FQNS;

type Props = {};

type State = {
  formData :Object
};

class FormContainer extends Component<Props, State> {

  state = {
    formData: mockExternalFormData
  };

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
    const entityData = processEntityData(formData, entitySetIds, propertyTypeIds);
    const associationData = processAssociationEntityData(this.getAssociations(), entitySetIds, propertyTypeIds);
    action('Adding Item')({ entityData, associationData });
  }

  updateItemIndicies = ({ formData } :Object) => {
    const pageSection = getPageSectionKey(1, 1);
    const indexKey = getEntityAddressKey(-1, TASK_ESN, INDEX_FQN);
    const taskItems = get(formData, getPageSectionKey(1, 1));
    let newFormData = formData;
    taskItems.forEach((item, index) => {
      newFormData = setIn(formData, [pageSection, index, indexKey], index);
    });

    this.setState({ formData: newFormData });
  }

  render() {
    const { formData } = this.state;
    const formContext = {
      addActions: {
        addTaskItem: action('Adding item')
      },
      deleteAction: action('Deleting data'),
      editAction: action('Submitting data for partialReplace'),
      entityIndexToIdMap,
      entitySetIds,
      mappers: {},
      propertyTypeIds,
    };

    return (
      <Form
          disabled
          formContext={formContext}
          formData={formData}
          onChange={this.updateItemIndicies}
          onSubmit={this.handleSubmit}
          schema={schema}
          uiSchema={uiSchema} />
    );
  }
}

export default FormContainer;
