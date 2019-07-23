// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { faChevronUp, faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import type { ChildrenArray } from 'react';

import IconButton from '../../components/IconButton';
import IndexCircle from '../../components/IndexCircle';
import ActionGutter from '../../components/styled/ActionGutter';


const ItemWrapper = styled.div`
  display: flex;
`;

type Props = {
  children :ChildrenArray<any>;
  className :string;
  disabled :boolean;
  // formContext :Object;
  hasMoveDown :boolean;
  hasMoveUp :boolean;
  hasRemove :boolean;
  index :number;
  onDropIndexClick :(index :number) => Function;
  onReorderClick :(index :number, newIndex :number) => Function;
  orderable :boolean;
  readonly :boolean;
  showIndex ? :boolean;
}

class DefaultArrayItem extends Component <Props> {

  static defaultProps = {
    showIndex: true,
  };

  handleConfirmDelete = () => {
    const {
      index,
      onDropIndexClick,
    } = this.props;
    onDropIndexClick(index)();
  }

  renderChildren = () => {
    const { children, hasRemove } = this.props;

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        ...child.props,
        onDelete: this.handleConfirmDelete,
        hasRemove
      });
    });
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
    );
  }
}

export default DefaultArrayItem;
