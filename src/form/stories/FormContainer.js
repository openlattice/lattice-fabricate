// @flow
import React, { Component } from 'react';

import { action } from '@storybook/addon-actions';
import { get, setIn } from 'immutable';
import { DateTime } from 'luxon';

import entityIndexToIdMap from './constants/entityIndexToIdMap';
import mockExternalFormData from './constants/mockExternalFormData';
import { schema, uiSchema } from './constants/dataSchemas';
import { entitySetIds, propertyTypeIds } from './constants/mockEDM';
import { ASSOCIATION_ENTITY_SET_NAMES, ENTITY_SET_NAMES, PROPERTY_TYPE_FQNS } from './constants/mockFQNs';

import Form from '..';
import {
  getEntityAddressKey,
  getPageSectionKey,
  processAssociationEntityData,
  processEntityData,
} from '../../utils/DataProcessingUtils';
import type { EdgeDefinition } from '../../utils/DataProcessingUtils';

const { INCLUDES_ESN } = ASSOCIATION_ENTITY_SET_NAMES;
const { TASK_LIST_ESN, TASK_ESN } = ENTITY_SET_NAMES;
const { COMPLETED_DT_FQN, INDEX_FQN } = PROPERTY_TYPE_FQNS;

type Props = {
  disabled :boolean;
};

type State = {
  formData :Object;
};

class FormContainer extends Component<Props, State> {

  static defaultProps = {
    disabled: false
  };

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

  handleSubmit = ({ formData, path } :Object) => {
    const entityData = processEntityData(formData, entitySetIds, propertyTypeIds);
    const associationData = processAssociationEntityData(this.getAssociations(), entitySetIds, propertyTypeIds);
    action('Submitting')({
      entityData,
      associationData,
      formData,
      path,
      properties: formData
    });
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
    const { disabled } = this.props;
    const { formData } = this.state;
    const formContext = {
      addActions: {
        addTaskItem: this.handleSubmit
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
          disabled={disabled}
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
