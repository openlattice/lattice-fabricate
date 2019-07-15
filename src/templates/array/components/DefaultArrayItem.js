// @flow
import React from 'react';
import styled from 'styled-components';
import { faTrash, faChevronUp, faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import type { ChildrenArray } from 'react';

import IconButton from './IconButton';
import IndexCircle from './IndexCircle';


const ItemWrapper = styled.div`
  display: flex;
`;

const ActionGutter = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  text-align: center;
`;

type DefaultArrayItemProps = {
  index :number;
  children :ChildrenArray<any>;
  className :string;
  hasRemove :boolean;
  hasMoveUp :boolean;
  hasMoveDown :boolean;
  disabled :boolean;
  readonly :boolean;
  onDropIndexClick :(index :number) => Function;
  onReorderClick :(index :number, newIndex :number) => Function;
  orderable :boolean;
  showIndex ? :boolean;
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
    showIndex
  } = props;

  return (
    <ItemWrapper className={className}>
      { orderable && (
        <ActionGutter>
          <IconButton
              icon={faChevronUp}
              disabled={disabled || readonly || !hasMoveUp}
              onClick={onReorderClick(index, index - 1)} />
          <IndexCircle index={index + 1} visible={showIndex} />
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
  showIndex: true,
};

export default DefaultArrayItem;
