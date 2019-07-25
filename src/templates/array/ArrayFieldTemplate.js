// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import isFunction from 'lodash/isFunction';
import { Button, Colors } from 'lattice-ui-kit';
import { getUiOptions } from 'react-jsonschema-form/lib/utils';
import type { ComponentType } from 'react';

import { ArrayFieldDescription, ArrayFieldTitle, DefaultArrayItem } from './components';

// modified RJSF ArrayTemplate

const { NEUTRALS } = Colors;

const MarginButton = styled(Button)`
  margin-top: 10px;
`;

const ArrayList = styled.div`
  > div {
    border-bottom: 1px solid ${NEUTRALS[4]};
    padding: 20px 0;
  }

  > div:last-of-type {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;

type Props = {
  // disabled ? :boolean,
  // readonly ? :boolean,
  DescriptionField :ComponentType<any>;
  TitleField :ComponentType<any>;
  canAdd ? :boolean;
  className :string;
  formContext ? :Object;
  idSchema :{ $id :string };
  items :Object[];
  onAddClick :(e :SyntheticEvent<HTMLButtonElement>) => void;
  required ? :boolean;
  schema :Object;
  title ? :string;
  uiSchema :Object;
}

class ArrayFieldTemplate extends Component<Props> {

  static defaultProps = {
    canAdd: true,
    formContext: undefined,
    // disabled: false,
    // readonly: false,
    required: false,
    title: '',
  };

  handleAddClick = (e :SyntheticEvent<HTMLButtonElement>) => {
    const { formContext, onAddClick, uiSchema } = this.props;
    const options = getUiOptions(uiSchema);

    // get action from formContext with matching addActionKey
    if (formContext && options) {
      const { addActions } = formContext;
      const { addActionKey } = options;
      const addAction = addActions[addActionKey];
      if (isFunction(addAction)) {
        addAction();
      }
    }

    onAddClick(e);
  };

  render() {
    const {
      canAdd,
      className,
      DescriptionField,
      // disabled,
      idSchema,
      items,
      // readonly,
      required,
      schema,
      title,
      TitleField,
      uiSchema,
    } = this.props;
    const {
      addButtonText = 'Add',
      orderable = true,
      showIndex = true
    } = uiSchema['ui:options'] || {};

    return (
      <div className={className}>
        <ArrayFieldTitle
            idSchema={idSchema}
            key={`array-field-title-${idSchema.$id}`}
            required={required}
            title={uiSchema['ui:title'] || title}
            TitleField={TitleField} />

        {(uiSchema['ui:description'] || schema.description) && (
          <ArrayFieldDescription
              description={uiSchema['ui:description'] || schema.description}
              DescriptionField={DescriptionField}
              idSchema={idSchema}
              key={`array-field-description-${idSchema.$id}`} />
        )}
        <ArrayList
            key={`array-item-list-${idSchema.$id}`}>
          {items && items.map(itemProps => (
            <DefaultArrayItem
                key={`array-item-${idSchema.$id}-${itemProps.index}`}
                {...itemProps}
                orderable={orderable}
                showIndex={showIndex} />
          ))}
          {(canAdd) && (
            <MarginButton
                mode="subtle"
                onClick={this.handleAddClick}>
              {addButtonText}
            </MarginButton>
          )}
        </ArrayList>
      </div>
    );
  }
}

export default ArrayFieldTemplate;
