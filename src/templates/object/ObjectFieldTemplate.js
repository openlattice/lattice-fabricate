// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { Button } from 'lattice-ui-kit';
import { faPen } from '@fortawesome/pro-solid-svg-icons';
import { fromJS, set } from 'immutable';
import { getUiOptions } from 'react-jsonschema-form/lib/utils';

import IconButton from '../components/IconButton';
import ActionGutter from '../components/styled/ActionGutter';
import { ActionGroup } from '../../form/src/components/styled';
import { parseIdIndex } from './utils';

type Props = {
  DescriptionField :ComponentType<any>;
  TitleField :ComponentType<any>;
  disabled :boolean;
  description :string;
  formData :Object;
  idSchema :Object;
  properties :Object[];
  required :string;
  schema :Object;
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

  commitDraftFormData = () => {
    const { draftFormData } = this.state;
    const { formData } = this.props;
    console.log('commit draftFormData');
    console.log('formData', formData);
    console.log('draftFormData', draftFormData);
  };

  renderSubmitSection = () => {
    const { isEditing } = this.state;

    return isEditing && (
      <ActionGroup className="column-span-12" noPadding>
        <Button mode="primary" onClick={this.commitDraftFormData}>Submit</Button>
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
      formData,
      idSchema,
      properties,
      schema,
      uiSchema,
    } = this.props;
    const { isEditing, draftFormData } = this.state;
    const { editable } :Object = getUiOptions(uiSchema);

    // const index = parseIdIndex(idSchema);

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
            // Inject index data
            // if ((typeof index === 'number') && schema.indexProperty && (contentName === schema.indexProperty)) {
            //   state = set(state, 'formData', index);
            // }

            if (editable && isEditing) {
              const tempFormData = draftFormData[contentName];
              // temporarily inject override props to children
              state = {
                ...contentProps,
                disabled: disabled && !isEditing,
                formData: tempFormData,
                onChange: this.createDraftChangeHandler(contentName)
              };
              return React.cloneElement(content, state);
            }

            const wrappedOnChange = (...rest) => {
              // just wanna log what this on change is expecting
              console.log('inside', rest);
              contentProps.onChange(...rest);
            };

            return React.cloneElement(content, { state, onChange: wrappedOnChange });
          })}
          { this.renderSubmitSection() }
        </div>
        { this.renderActionGutter() }
      </>
    );
  }
}

export default ObjectFieldTemplate;
