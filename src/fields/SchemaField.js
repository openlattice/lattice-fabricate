// @flow
import React, { Component } from 'react';

import SchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';
import isFunction from 'lodash/isFunction';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import ActionGutter from '../templates/components/styled/ActionGutter';
import ConfirmDeleteModal from '../templates/array/components/ConfirmDeleteModal';
import IconButton from '../templates/components/IconButton';
import { parseIdIndex } from '../templates/object/utils';
import {
  findEntityAddressKeyFromMap,
  getEntityKeyIdsByEntitySetId,
  parseIdSchemaPath,
  replaceEntityAddressKeys,
} from '../utils/DataProcessingUtils';

type Props = {
  disabled :boolean;
  errorSchema :Object;
  formContext :Object;
  formData :Object;
  hasRemove :boolean;
  idSchema :Object;
  onDelete :() => void;
  properties :Object[];
  readonly :boolean;
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

  handleConfirmDelete = () => {
    const {
      onDelete,
      formData,
      idSchema,
      registry
    } = this.props;
    const { entitySetIds = {}, deleteAction, entityIndexToIdMap } = registry.formContext;
    const arrayIndex = parseIdIndex(idSchema);
    const formDataWithKeys = replaceEntityAddressKeys(
      formData,
      findEntityAddressKeyFromMap(entityIndexToIdMap, arrayIndex)
    );
    const EKIDsbySet = getEntityKeyIdsByEntitySetId(formDataWithKeys, entitySetIds);
    if (isFunction(deleteAction)) {
      const path = parseIdSchemaPath(idSchema);
      deleteAction({ entityData: EKIDsbySet, path, formData });
    }
    onDelete();
    this.closeDeleteModal();
  }

  render() {
    const { hasRemove, readonly, idSchema } = this.props;
    const { isVisible } = this.state;
    /* eslint-disable react/jsx-props-no-spreading */
    const { $id } = idSchema;
    return (
      <>
        <SchemaField {...this.props} />
        {(hasRemove && !readonly) && (
          <>
            <ActionGutter>
              <IconButton
                  icon={faTrash}
                  id={`remove-button-${$id}`}
                  onClick={this.openDeleteModal} />
            </ActionGutter>
            <ConfirmDeleteModal
                id={`remove-modal-${$id}`}
                isVisible={isVisible}
                onClickPrimary={this.handleConfirmDelete}
                onClickSecondary={this.closeDeleteModal}
                onClose={this.closeDeleteModal} />
          </>
        )}
      </>
    );
    /* eslint-enable */
  }
}

export default CustomSchemaField;
