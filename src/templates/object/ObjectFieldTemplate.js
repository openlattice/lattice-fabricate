// @flow
import { Component, cloneElement } from 'react';
import type { ComponentType } from 'react';

import isFunction from 'lodash/isFunction';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { utils } from '@rjsf/core';
import { fromJS, set } from 'immutable';
import { Button } from 'lattice-ui-kit';

import { parseIdIndex } from './utils';

import ActionGutter from '../components/styled/ActionGutter';
import IconButton from '../components/IconButton';
import { ActionGroup } from '../../form/src/components/styled';
import {
  findEntityAddressKeyFromMap,
  parseIdSchemaPath,
  processEntityDataForPartialReplace,
  replaceEntityAddressKeys,
  wrapFormDataInPageSection,
} from '../../utils/DataProcessingUtils';

const { getUiOptions } = utils;

type Props = {
  DescriptionField :ComponentType<any>;
  TitleField :ComponentType<any>;
  description :string;
  disabled :boolean;
  formContext :Object;
  formData :Object;
  idSchema :Object;
  properties :Object[];
  readonly :boolean;
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

  componentDidUpdate(prevProps :Props) {
    const { formData } = this.props;
    const { formData: prevFormData } = prevProps;
    if (formData !== prevFormData) {
      this.disableFields();
    }
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
    const {
      disabled,
      idSchema,
      readonly,
      uiSchema,
    } = this.props;
    const { $id } = idSchema;
    const { isEditing } = this.state;
    const { editable } :Object = getUiOptions(uiSchema);

    return (editable && disabled && !readonly)
      ? (
        <ActionGutter>
          <IconButton id={`edit-button-${$id}`} icon={faPen} onClick={this.enableFields} disabled={isEditing} />
        </ActionGutter>
      )
      : null;
  }

  commitDraftFormData = () => {
    const { draftFormData } = this.state;
    const { formData, formContext, idSchema } = this.props;
    const {
      editAction,
      entityIndexToIdMap,
      entitySetIds,
      mappers,
      propertyTypeIds,
    } = formContext;

    // get array index if relevant
    const arrayIndex = parseIdIndex(idSchema);
    const path = parseIdSchemaPath(idSchema);

    // wrap formData in pageSection
    const formattedData = wrapFormDataInPageSection(draftFormData);
    const formattedOriginal = wrapFormDataInPageSection(formData);

    // replace address keys with entityKeyId
    const draftWithKeys = replaceEntityAddressKeys(
      formattedData,
      findEntityAddressKeyFromMap(entityIndexToIdMap, arrayIndex)
    );

    const standardWithKeys = replaceEntityAddressKeys(
      formattedOriginal,
      findEntityAddressKeyFromMap(entityIndexToIdMap, arrayIndex)
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
      editAction({
        entityData: editedEntityData,
        formData: formattedData,
        path,
        properties: draftFormData,
      });
      this.disableFields();
    }

  };

  renderActionSection = () => {
    const { isEditing } = this.state;
    const { formContext } = this.props;
    const { updateState } = formContext;

    return isEditing && (
      <ActionGroup className="column-span-12" noPadding>
        <Button
            isLoading={updateState}
            color="primary"
            onClick={this.commitDraftFormData}>
          Save
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

    return <>
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
            // inject override props to children
            state = {
              ...contentProps,
              disabled: disabled && !isEditing,
              formData: tempFormData,
              onChange: this.createDraftChangeHandler(contentName),
            };
            return cloneElement(content, state);
          }
          return content;
        })}
        { this.renderActionSection() }
      </div>
      { this.renderActionGutter() }
    </>;
  }
}

export default ObjectFieldTemplate;
