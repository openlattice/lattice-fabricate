// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
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
  disabled :boolean;
  className :string;
  formContext ? :Object;
  formData :Object;
  idSchema :{ $id :string };
  items :Object[];
  onAddClick :(e :SyntheticEvent<HTMLButtonElement>) => void;
  required ? :boolean;
  schema :Object;
  title ? :string;
  uiSchema :Object;
}

type State = {
  hasAddedItem :boolean;
}
class ArrayFieldTemplate extends Component<Props, State> {

  static defaultProps = {
    canAdd: true,
    formContext: undefined,
    // disabled: false,
    // readonly: false,
    required: false,
    title: '',
  };

  state = {
    hasAddedItem: false,
  }

  handleAddClick = (e :SyntheticEvent<HTMLButtonElement>) => {
    const { disabled, onAddClick } = this.props;

    if (disabled) {
      this.setState({ hasAddedItem: true });
    }

    // RJSF add new item
    onAddClick(e);
  };

  removeAddedItem = () => {
    this.setState({ hasAddedItem: false });
  }

  createAddAction = (action :() => any) => (...params :any[]) => {
    // remove index from addedItems
    this.removeAddedItem();

    // invoke addAction from formContext
    action(...params);
  };

  render() {
    const {
      canAdd,
      className,
      DescriptionField,
      formContext,
      idSchema,
      items,
      // readonly,
      required,
      schema,
      title,
      TitleField,
      uiSchema,
    } = this.props;
    const { hasAddedItem } = this.state;
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
          {items && items.map((itemProps, index) => {
            const options = getUiOptions(uiSchema);

            const additionalProps :any = {
              orderable,
              showIndex,
            };

            // give additional responsibility to added item
            if (hasAddedItem
              && !!formContext
              && !!options
              && index === items.length - 1
            ) {
              const { addActions, isAdding } = formContext;
              const { addActionKey } = options;
              const action = this.createAddAction(addActions[addActionKey]);
              additionalProps.removeAddedItem = this.removeAddedItem;
              additionalProps.addAction = action;
              additionalProps.isAdding = isAdding;
              additionalProps.addState = hasAddedItem;
            }

            return (
              <DefaultArrayItem
                  key={`array-item-${idSchema.$id}-${itemProps.index}`}
                  {...itemProps}
                  {...additionalProps} />
            );
          })}
          {(canAdd) && (
            <MarginButton
                disabled={hasAddedItem}
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
