// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { faChevronUp, faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { Button } from 'lattice-ui-kit';
import type { ChildrenArray } from 'react';

import IconButton from '../../components/IconButton';
import IndexCircle from '../../components/IndexCircle';
import ActionGutter from '../../components/styled/ActionGutter';


const ItemWrapper = styled.div`
  display: flex;
`;

const ButtonWithMargin = styled(Button)`
  margin-left: ${props => props.orderable && '36px'};
`;

type Props = {
  addAction ? :() => void;
  addState ? :boolean;
  children :ChildrenArray<any>;
  className :string;
  disabled :boolean;
  hasMoveDown :boolean;
  hasMoveUp :boolean;
  hasRemove :boolean;
  index :number;
  isAdding ? :boolean;
  onDropIndexClick :(index :number) => Function;
  onReorderClick :(index :number, newIndex :number) => Function;
  orderable :boolean;
  readonly :boolean;
  showIndex ? :boolean;
}

class DefaultArrayItem extends Component <Props> {

  static defaultProps = {
    addAction: undefined,
    addState: false,
    isAdding: false,
    showIndex: true,
  };

  createDropIndexHandler = () => {
    const {
      index,
      onDropIndexClick,
    } = this.props;
    return onDropIndexClick(index);
  }

  renderChildren = () => {
    const { children, hasRemove, addState } = this.props;

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        ...child.props,
        disabled: !addState,
        hasRemove,
        onDelete: this.createDropIndexHandler(),
      });
    });
  }

  renderSubmitButton = () => {
    const {
      addState,
      addAction,
      isAdding,
      orderable
    } = this.props;

    return addState && (
      <ButtonWithMargin orderable={orderable} mode="primary" onClick={addAction} isLoading={isAdding}>
          Submit
      </ButtonWithMargin>
    );
  }

  render() {
    const {
      className,
      disabled,
      hasMoveDown,
      hasMoveUp,
      index,
      onReorderClick,
      orderable,
      readonly,
      showIndex
    } = this.props;

    return (
      <div>
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
          { this.renderChildren() }
        </ItemWrapper>
        { this.renderSubmitButton() }
      </div>
    );
  }
}

export default DefaultArrayItem;
