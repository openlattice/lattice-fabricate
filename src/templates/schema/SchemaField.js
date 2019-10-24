// @flow
import React, { Component } from 'react';
import SchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';
import isFunction from 'lodash/isFunction';
import { faTrash } from '@fortawesome/pro-solid-svg-icons';

import ConfirmDeleteModal from '../array/components/ConfirmDeleteModal';
import IconButton from '../components/IconButton';
import ActionGutter from '../components/styled/ActionGutter';
import { parseIdIndex } from '../object/utils';
import {
  findEntityAddressKeyFromMap,
  getEntityKeyIdsByEntitySetId,
  parseIdSchemaPath,
  replaceEntityAddressKeys,
} from '../../utils/DataProcessingUtils';

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
    const { hasRemove } = this.props;
    const { isVisible } = this.state;
    /* eslint-disable react/jsx-props-no-spreading */
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
    /* eslint-enable */
  }
}

export default CustomSchemaField;
