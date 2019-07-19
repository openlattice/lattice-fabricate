// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { fromJS, set } from 'immutable';
import { faPen } from '@fortawesome/pro-solid-svg-icons';
import { getUiOptions } from 'react-jsonschema-form/lib/utils';
import { Button } from 'lattice-ui-kit';

import IconButton from '../components/IconButton';
import ActionGutter from '../components/styled/ActionGutter';
import { ActionGroup } from '../../form/src/components/styled';

type Props = {
  DescriptionField :ComponentType<any>;
  TitleField :ComponentType<any>;
  disabled :boolean;
  description :string;
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
    const { uiSchema } = this.props;
    const { isEditing } = this.state;
    const { editable } :Object = getUiOptions(uiSchema);

    return (editable && !isEditing)
      ? (
        <ActionGutter>
          <IconButton icon={faPen} onClick={this.enableFields} />
        </ActionGutter>
      )
      : null;
  }

  renderSubmitSection = () => {
    const { isEditing } = this.state;
    return isEditing && (
      <ActionGroup className="column-span-12" noPadding>
        <Button mode="primary">Submit</Button>
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
    const { disabled, properties, uiSchema } = this.props;
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
            const tempFormData = draftFormData[contentName];

            let state = contentProps;
            if (editable && isEditing) {
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
