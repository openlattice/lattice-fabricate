// @flow
import React, { Component } from 'react';
import SchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';
import isFunction from 'lodash/isFunction';
import { faTrash } from '@fortawesome/pro-solid-svg-icons';
import { getIn } from 'immutable';

import ConfirmDeleteModal from '../array/components/ConfirmDeleteModal';
import IconButton from '../components/IconButton';
import ActionGutter from '../components/styled/ActionGutter';
import { isValidUUID } from '../../utils/ValidationUtils';
import { parseIdIndex } from '../object/utils';
import {
  getEntityAddressKey,
  isValidEntityAddressKey,
  parseEntityAddressKey,
  replaceEntityAddressKeys,
  getEKIDsBySet,
} from '../../utils/DataProcessingUtils';
import type { EntityAddress } from '../../utils/DataProcessingUtils';

type Props = {
  disabled :boolean;
  formContext :Object;
  formData :Object;
  hasRemove :boolean;
  idSchema :Object;
  onDelete :() => void;
  properties :Object[];
  registry :Object;
  required :string;
  title :string;
  uiSchema :Object;
}

type State = {
  isVisible :boolean;
};

class CustomSchemaField extends Component<Props, State> {
  state = {
    isVisible: false
  };

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

  findEntityAddressKeyFromMap = (key :string) :string => {
    const { registry, idSchema } = this.props;
    const { entityIndexToIdMap = {} } = registry.formContext;
    const arrayIndex = parseIdIndex(idSchema);

    if (isValidEntityAddressKey(key)) {
      const {
        entityIndex,
        entitySetName,
        propertyTypeFQN
      } :EntityAddress = parseEntityAddressKey(key);

      let entityKeyId = getIn(entityIndexToIdMap, [entitySetName, entityIndex]);
      if (entityIndex !== undefined && entityIndex < 0 && arrayIndex !== undefined) {

        entityKeyId = getIn(entityIndexToIdMap, [entitySetName, entityIndex, arrayIndex]);
      }
      if (isValidUUID(entityKeyId)) {
        return getEntityAddressKey(entityKeyId, entitySetName, propertyTypeFQN);
      }
    }
    return key;
  };

  handleConfirmDelete = () => {
    const { onDelete, formData, registry } = this.props;
    const { entitySetIds = {}, deleteAction } = registry.formContext;
    const formDataWithKeys = replaceEntityAddressKeys(
      formData,
      this.findEntityAddressKeyFromMap
    );
    const EKIDsbySet = getEKIDsBySet(formDataWithKeys, entitySetIds);
    if (isFunction(deleteAction)) {
      deleteAction(EKIDsbySet);
      onDelete();
      this.closeDeleteModal();
    }
  }

  render() {
    const { hasRemove } = this.props;
    const { isVisible } = this.state;
    return (
      <>
        <SchemaField {...this.props} />
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
      </>
    );
  }
}

export default CustomSchemaField;
