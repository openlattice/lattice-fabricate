// @flow
import React, { Component } from 'react';
import type { Element } from 'react';

import findLast from 'lodash/findLast';
import isFunction from 'lodash/isFunction';
import styled from 'styled-components';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-solid-svg-icons';
import { Button } from 'lattice-ui-kit';

import ActionGutter from '../../components/styled/ActionGutter';
import IconButton from '../../components/IconButton';
import IndexCircle from '../../components/IndexCircle';
import {
  isValidPageSectionKey,
  parseIdSchemaPath,
  processEntityData,
  wrapFormDataInPageSection,
} from '../../../utils/DataProcessingUtils';

const ItemWrapper = styled.div`
  display: flex;
`;

const ButtonWithMargin = styled(Button)`
  margin-top: 20px;
  margin-left: ${(props) => props.orderable && '36px'};
`;

type Props = {
  addAction ?:() => void;
  addState ?:boolean;
  children :Element<any>;
  className :string;
  disabled :boolean;
  hasMoveDown :boolean;
  hasMoveUp :boolean;
  hasRemove :boolean;
  index :number;
  isAdding ?:boolean;
  onDropIndexClick :(index :number) => Function;
  onReorderClick :(index :number, newIndex :number) => Function;
  orderable :boolean;
  readonly :boolean;
  removeAddedItem ?:() => void;
  showIndex ?:boolean;
}

class DefaultArrayItem extends Component <Props> {

  static defaultProps = {
    addAction: undefined,
    removeAddedItem: undefined,
    addState: false,
    isAdding: false,
    showIndex: true,
  };

  createDropIndexHandler = () => {
    const {
      index,
      onDropIndexClick,
      removeAddedItem
    } = this.props;
    return () => {
      if (removeAddedItem) {
        removeAddedItem();
      }
      // RJSF remove item
      onDropIndexClick(index)();
    };
  }

  handleAddAction = () => {
    const { addAction, children, removeAddedItem } = this.props;
    // array item child is SchemaField
    const { formData, idSchema, registry } = children.props;
    const path = parseIdSchemaPath(idSchema);
    const pageSection = findLast(path, isValidPageSectionKey);

    const { entitySetIds, propertyTypeIds, mappers } = registry.formContext;
    const formattedData = wrapFormDataInPageSection([{ ...formData }], pageSection);

    const processedEntityData = processEntityData(
      formattedData,
      entitySetIds,
      propertyTypeIds,
      mappers
    );

    if (isFunction(addAction) && isFunction(removeAddedItem)) {
      removeAddedItem();
      addAction({
        entityData: processedEntityData,
        formData: formattedData,
        path,
        properties: formData
      });
    }
  }

  renderSubmitButton = () => {
    const {
      addState,
      isAdding,
      orderable
    } = this.props;

    return addState && (
      <ButtonWithMargin
          orderable={orderable}
          mode="primary"
          onClick={this.handleAddAction}
          isLoading={isAdding}>
        Submit
      </ButtonWithMargin>
    );
  }

  renderChildren = () => {
    const { children, hasRemove, addState } = this.props;

    if (!(hasRemove || addState)) return children;

    let additionalProps = {};

    if (hasRemove) {
      additionalProps = Object.assign(additionalProps, {
        hasRemove,
        onDelete: this.createDropIndexHandler()
      });
    }

    if (addState) {
      additionalProps = Object.assign(additionalProps, { disabled: !addState });
    }

    return React.cloneElement(children, {
      ...children.props,
      ...additionalProps,
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
