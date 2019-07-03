// @flow
import React from 'react';
import styled from 'styled-components';
import { faTrash } from '@fortawesome/pro-solid-svg-icons';
import { faChevronUp, faChevronDown } from '@fortawesome/pro-light-svg-icons';
import IconButton from './IconButton';


const ItemWrapper = styled.div`
  display: flex;
`;

const ActionGutter = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px;
`;

type DefaultArrayItemProps = {
  index :number;
  children :React.ChildrenArray<any> | React.Element<any>;
  className :string;
  hasRemove ? :boolean;
  disabled ? :boolean;
  readonly ? :boolean;
  onDropIndexClick :(index :number) => void;
  removeButtonText ? :string;
}

const DefaultArrayItem = (props :DefaultArrayItemProps) => {
  const {
    index,
    className,
    children,
    hasRemove,
    hasMoveUp,
    hasMoveDown,
    hasToolbar,
    disabled,
    readonly,
    onDropIndexClick,
    onReorderClick,
    removeButtonText
  } = props;
  console.log('arrayItemProps', props);
  return (
    <ItemWrapper key={index} className={className}>
      <ActionGutter>
        {hasToolbar && (
          <IconButton
              icon={faChevronUp}
              tabIndex="0"
              disabled={disabled || readonly || !hasMoveUp}
              onClick={onReorderClick(index, index + 1)}>
            {removeButtonText}
          </IconButton>
        )}
        {hasToolbar && (
          <IconButton
              icon={faChevronDown}
              tabIndex="0"
              disabled={disabled || readonly || !hasMoveDown}
              onClick={onReorderClick(index, index - 1)}>
            {removeButtonText}
          </IconButton>
        )}
        {(hasRemove && !disabled) && (
          <IconButton
              icon={faTrash}
              tabIndex="0"
              disabled={disabled || readonly}
              onClick={onDropIndexClick(index)}>
            {removeButtonText}
          </IconButton>
        )}
      </ActionGutter>
      {children}
    </ItemWrapper>
  );
};

DefaultArrayItem.defaultProps = {
  disabled: false,
  readonly: false,
  hasRemove: true,
  removeButtonText: 'Remove'
};

export default DefaultArrayItem;
