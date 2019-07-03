// @flow
import React from 'react';
import styled from 'styled-components';
import { Button } from 'lattice-ui-kit';

const MarginButton = styled(Button)`
  margin-top: 10px;
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
    removeButtonText
  } = props;
  return (
    <div key={index} className={className}>
      something
      {children}
      {(hasRemove && !disabled) && (
        <MarginButton
            tabIndex="-1"
            disabled={disabled || readonly}
            onClick={onDropIndexClick(index)}>
          {removeButtonText}
        </MarginButton>
      )}
    </div>
  );
};

DefaultArrayItem.defaultProps = {
  disabled: false,
  readonly: false,
  hasRemove: true,
  removeButtonText: 'Remove'
};

export default DefaultArrayItem;
