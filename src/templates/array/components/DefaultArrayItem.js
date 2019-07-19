// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { faTrash, faChevronUp, faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import type { ChildrenArray } from 'react';

import ConfirmDeleteModal from './ConfirmDeleteModal';
import IconButton from '../../components/IconButton';
import IndexCircle from '../../components/IndexCircle';


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
  children :ChildrenArray<any>;
  className :string;
  disabled :boolean;
  formContext :Object;
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

type State = {
  isVisible :boolean;
}

class DefaultArrayItem extends Component <DefaultArrayItemProps, State> {

  static defaultProps = {
    showIndex: true,
  };

  state = {
    isVisible: false
  }

  openDeleteModal = () => {
    this.setState({
      isVisible: true
    });
  }

  closeDeleteModal = () => {
    this.setState({
      isVisible: false
    });
  }

  handleConfirmDelete = () => {
    const { index, onDropIndexClick, formContext } = this.props;
    const { deleteAction } = formContext;
    console.log('clicking', index);
    onDropIndexClick(index)();
    this.closeDeleteModal();
  }

  render() {
    const {
      children,
      className,
      disabled,
      hasMoveDown,
      hasMoveUp,
      hasRemove,
      index,
      onReorderClick,
      orderable,
      readonly,
      showIndex
    } = this.props;
    const { isVisible } = this.state;
  
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
        {(hasRemove) && (
          <ActionGutter>
            <IconButton
                icon={faTrash}
                onClick={this.openDeleteModal} />
          </ActionGutter>
        )}
        <ConfirmDeleteModal
            onClickPrimary={this.handleConfirmDelete}
            onClickSecondary={this.closeDeleteModal}
            onClose={this.closeDeleteModal}
            isVisible={isVisible} />
      </ItemWrapper>
    );
  }
}

export default DefaultArrayItem;
