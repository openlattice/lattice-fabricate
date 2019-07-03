// @flow
import React from 'react';
import styled from 'styled-components';
import { faTrash, faChevronUp, faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import IconButton from './IconButton';


const ItemWrapper = styled.div`
  display: flex;
`;

const ActionGutter = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  align-items: center;
  text-align: center;
`;

type DefaultArrayItemProps = {
  index :number;
  children :React.ChildrenArray<any> | React.Element<any>;
  className :string;
  hasRemove :boolean;
  hasMoveUp :boolean;
  hasMoveDown :boolean;
  disabled :boolean;
  readonly :boolean;
  onDropIndexClick :(index :number) => Function;
  onReorderClick :(index :number, newIndex :number) => Function;
  orderable :boolean;
  withIndex ? :boolean;
}

const DefaultArrayItem = (props :DefaultArrayItemProps) => {
  const {
    children,
    className,
    disabled,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    index,
    onDropIndexClick,
    onReorderClick,
    orderable,
    readonly,
    withIndex
  } = props;

  return (
    <ItemWrapper key={index} className={className}>
      { orderable && (
        <ActionGutter>
          <IconButton
              icon={faChevronUp}
              disabled={disabled || readonly || !hasMoveUp}
              onClick={onReorderClick(index, index - 1)} />
          { withIndex && index + 1 }
          <IconButton
              icon={faChevronDown}
              disabled={disabled || readonly || !hasMoveDown}
              onClick={onReorderClick(index, index + 1)} />
        </ActionGutter>
      )}
      {children}
      {(hasRemove && !disabled) && (
        <ActionGutter>
          <IconButton
              icon={faTrash}
              disabled={disabled || readonly}
              onClick={onDropIndexClick(index)} />
        </ActionGutter>
      )}
    </ItemWrapper>
  );
};

DefaultArrayItem.defaultProps = {
  withIndex: false,
};

export default DefaultArrayItem;
