// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'lattice-ui-kit';

import { ArrayFieldDescription, ArrayFieldTitle, DefaultArrayItem } from './components';

// modified RJSF ArrayTemplate

const MarginButton = styled(Button)`
  margin-top: 10px;
`;

const arrayListCss = css`
  > div {
    border-bottom: 1px solid #e1e1eb;
    padding: 20px 0;
  }

  > div:last-of-type {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;

const ArrayList = styled.div`
  ${props => (!props.compact ? arrayListCss : null)}
`;

type ArrayFieldTemplateProps = {
  canAdd ? :boolean,
  className :string,
  DescriptionField :Class<React.Component<*, *>> | React.StatelessFunctionalComponent<*>;
  disabled ? :boolean,
  idSchema :{ $id :string };
  items :Object[],
  onAddClick :() => void;
  readonly ? :boolean,
  required ? :boolean;
  schema :Object;
  title ? :string,
  TitleField :Class<React.Component<*, *>> | React.StatelessFunctionalComponent<*>;
  uiSchema :Object;
}

const ArrayFieldTemplate = (props :ArrayFieldTemplateProps) => {
  const {
    canAdd,
    className,
    DescriptionField,
    disabled,
    idSchema,
    items,
    onAddClick,
    readonly,
    required,
    schema,
    title,
    TitleField,
    uiSchema,
  } = props;

  const uiOptions = uiSchema['ui:options'] || {};
  const buttonText = {
    removeButtonText: 'Remove',
    addButtonText: 'Add',
    ...uiOptions
  };

  const { removeButtonText, addButtonText } = buttonText;

  return (
    <div className={className}>
      <ArrayFieldTitle
          key={`array-field-title-${idSchema.$id}`}
          TitleField={TitleField}
          idSchema={idSchema}
          title={uiSchema['ui:title'] || title}
          required={required} />

      {(uiSchema['ui:description'] || schema.description) && (
        <ArrayFieldDescription
            key={`array-field-description-${idSchema.$id}`}
            DescriptionField={DescriptionField}
            idSchema={idSchema}
            description={
              uiSchema['ui:description'] || schema.description
            } />
      )}
      <ArrayList
          compact={uiOptions.compact}
          key={`array-item-list-${idSchema.$id}`}>
        {items && items.map(itemProps => <DefaultArrayItem {...itemProps} removeButtonText={removeButtonText} />)}
        {(canAdd && !disabled) && (
          <MarginButton
              tabIndex="0"
              onClick={onAddClick}
              disabled={disabled || readonly}>
            {addButtonText}
          </MarginButton>
        )}
      </ArrayList>
    </div>
  );
};

ArrayFieldTemplate.defaultProps = {
  title: '',
  disabled: false,
  readonly: false,
  canAdd: true,
  required: false,
};

export default ArrayFieldTemplate;
