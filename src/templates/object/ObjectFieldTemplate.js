// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';

import isFunction from 'lodash/isFunction';
import { Button } from 'lattice-ui-kit';
import { faPen } from '@fortawesome/pro-solid-svg-icons';
import { fromJS, getIn, set } from 'immutable';
import { getUiOptions } from 'react-jsonschema-form/lib/utils';

import IconButton from '../components/IconButton';
import ActionGutter from '../components/styled/ActionGutter';
import { ActionGroup } from '../../form/src/components/styled';
import { parseIdIndex } from './utils';
import { isValidUUID } from '../../utils/ValidationUtils';
import {
  getEntityAddressKey,
  getPageSectionKey,
  isValidEntityAddressKey,
  parseEntityAddressKey,
  processEntityDataForPartialReplace,
  replaceEntityAddressKeys,
} from '../../utils/DataProcessingUtils';
import type { EntityAddress } from '../../utils/DataProcessingUtils';

type Props = {
  DescriptionField :ComponentType<any>;
  TitleField :ComponentType<any>;
  description :string;
  disabled :boolean;
  formContext :Object;
  formData :Object;
  idSchema :Object;
  properties :Object[];
  required :string;
  title :string;
  uiSchema :Object;
};

type State = {
  isEditing :boolean;
  draftFormData :Object;
}

class ObjectFieldTemplate extends Component<Props, State> {

  constructor(props :Props) {
    super(props);
    this.state = {
      isEditing: false,
      draftFormData: {}
    };
  }

  enableFields = () => {
    const { formData } = this.props;
    this.setState({
      isEditing: true,
      // deep copy formData
      draftFormData: fromJS(formData).toJS()
    });
  }

  disableFields = () => {
    this.setState({
      isEditing: false,
      draftFormData: {}
    });
  }

  renderTitleField = () => {
    const {
      uiSchema,
      title,
      TitleField,
      idSchema,
      required,
    } = this.props;
    if (uiSchema['ui:title'] || title) {
      // Title field renders 'legend'
      return (
        <TitleField
            id={`${idSchema.$id}__title`}
            title={title || uiSchema['ui:title']}
            required={required} />
      );
    }
    return null;
  }

  renderDescriptionField = () => {
    const { description, DescriptionField, idSchema } = this.props;
    if (description) {
      return (
        <DescriptionField
            id={`${idSchema.$id}__description`}
            description={description} />
      );
    }

    return null;
  }

  renderActionGutter = () => {
    const { uiSchema, disabled } = this.props;
    const { isEditing } = this.state;
    const { editable } :Object = getUiOptions(uiSchema);

    return (editable && !isEditing && disabled)
      ? (
        <ActionGutter>
          <IconButton icon={faPen} onClick={this.enableFields} />
        </ActionGutter>
      )
      : null;
  }

  findEntityAddressKeyFromMap = (arrayIndex ? :number) => (key :string) :string => {
    const { formContext } = this.props;
    const { entityIndexToIdMap } = formContext;

    if (isValidEntityAddressKey(key)) {
      const {
        entityIndex,
        entitySetName,
        propertyTypeFQN
      } :EntityAddress = parseEntityAddressKey(key);

      let entityKeyId = getIn(entityIndexToIdMap, [entitySetName, entityIndex]);
      if (entityIndex !== undefined && entityIndex < 0 && arrayIndex !== undefined) {

        entityKeyId = getIn(entityIndexToIdMap, [entitySetName, entityIndex, arrayIndex]);
      }
      if (isValidUUID(entityKeyId)) {
        return getEntityAddressKey(entityKeyId, entitySetName, propertyTypeFQN);
      }
    }
    return key;
  };

  formatFormData = (formData :Object) => {
    let formattedFormData = {};
    formattedFormData = set(formattedFormData, getPageSectionKey(1, 1), formData);
    return formattedFormData;
  }

  commitDraftFormData = () => {
    const { draftFormData } = this.state;
    const { formData, formContext, idSchema } = this.props;
    const {
      editAction,
      entitySetIds,
      mappers,
      propertyTypeIds,
    } = formContext;

    // get array index if relevant
    const arrayIndex = parseIdIndex(idSchema);

    // wrap formData in pageSection
    const formattedDraft = this.formatFormData(draftFormData);
    const formattedOriginal = this.formatFormData(formData);

    // replace address keys with entityKeyId
    const draftWithKeys = replaceEntityAddressKeys(
      formattedDraft,
      this.findEntityAddressKeyFromMap(arrayIndex)
    );

    const standardWithKeys = replaceEntityAddressKeys(
      formattedOriginal,
      this.findEntityAddressKeyFromMap(arrayIndex)
    );

    // process for partial replace
    const editedEntityData = processEntityDataForPartialReplace(
      draftWithKeys,
      standardWithKeys,
      entitySetIds,
      propertyTypeIds,
      mappers
    );

    if (isFunction(editAction)) {
      editAction({ entityData: editedEntityData });
    }

  };

  renderSubmitSection = () => {
    const { isEditing } = this.state;
    const { formContext } = this.props;
    const { updateState } = formContext;

    return isEditing && (
      <ActionGroup className="column-span-12" noPadding>
        <Button
            mode="primary"
            onClick={this.commitDraftFormData}
            isLoading={updateState}>
              Submit
        </Button>
        <Button onClick={this.disableFields}>Discard</Button>
      </ActionGroup>
    );
  }

  createDraftChangeHandler = (name :string) => (value :any) => {
    const { draftFormData } = this.state;
    this.setState({
      draftFormData: set(draftFormData, name, value)
    });
  }

  render() {
    const {
      disabled,
      properties,
      uiSchema,
    } = this.props;
    const { isEditing, draftFormData } = this.state;
    const { editable } :Object = getUiOptions(uiSchema);

    return (
      <>
        <div>
          { this.renderTitleField() }
          { this.renderDescriptionField() }
          {properties.map((property) => {
            const { content } = property;
            const { props: contentProps } = content;
            const contentName = contentProps.name;

            let state = contentProps;

            if (editable && isEditing) {
              const tempFormData = draftFormData[contentName];
              // temporarily inject override props to children
              state = {
                ...contentProps,
                disabled: disabled && !isEditing,
                formData: tempFormData,
                onChange: this.createDraftChangeHandler(contentName)
              };
            }

            return React.cloneElement(content, state);
          })}
          { this.renderSubmitSection() }
        </div>
        { this.renderActionGutter() }
      </>
    );
  }
}

export default ObjectFieldTemplate;
