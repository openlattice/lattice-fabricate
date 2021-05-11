// @flow
/* eslint-disable no-underscore-dangle */
import { Component } from 'react';
import type { Ref } from 'react';

import Form from '@rjsf/core';
// $FlowFixMe
import { List } from 'lattice-ui-kit';
import { isFunction } from 'lodash';
import type { UUID } from 'lattice';

import AccordionSection from './components/AccordionSection';
import AttachmentItem from './components/AttachmentItem';
import FileUpload from './components/FileUpload';

import { getCurrentFormData } from '../form/src/components/PageUtils';

type OnDrop = (
  file :Object,
  attachmentDestinationId :UUID,
  fieldId :string,
  formData :Object,
) => void;

type OnDeleteAttachment = (
  entityKeyId :string,
  attachment :Object,
  formData :Object
) => void;

type FormContext = {
  attachments :{ [string] :Object[] };
  attachmentDestinationId :string;
  onDrop :OnDrop;
  onDeleteAttachment :OnDeleteAttachment;
  formRef :Ref<Form>;
};

type Props = {
  disabled :boolean,
  formContext :FormContext;
  formData :Object;
  uiSchema :Object;
}

class AttachmentsField extends Component<Props> {

  handleDrop = ({ file } :{ file :any }) => {
    const { formContext, formData } = this.props;
    const { attachmentDestinationId, onDrop, formRef } = formContext;
    const { _id } = formData;
    const currentFormData = getCurrentFormData(formRef);
    if (isFunction(onDrop)) {
      onDrop(
        file,
        attachmentDestinationId,
        _id,
        currentFormData,
      );
    }
    else {
      console.error('formContext.onDrop is not a function');
    }
  }

  onDelete = (itemId :UUID, item :Object) => {
    const { formContext } = this.props;
    const { onDeleteAttachment, formRef } = formContext;
    if (isFunction(onDeleteAttachment)) {
      const currentFormData = getCurrentFormData(formRef);
      onDeleteAttachment(itemId, item, currentFormData);
    }
    else {
      console.error('formContext.onDropAttachment is not a function');
    }
  };

  render() {
    const {
      disabled,
      formContext,
      formData,
      uiSchema,
    } = this.props;
    const { attachments = {} } = formContext;
    const { _id } = formData;
    const { accept } = uiSchema['ui:options'] || {};
    const fieldAttachments = attachments[_id] || [];
    const count = fieldAttachments.length;
    const title = count ? `Attachments (${count})` : 'Attachments';

    return (
      <AccordionSection title={title}>
        <FileUpload disabled={disabled} accept={accept} onChange={this.handleDrop} />
        <List dense>
          {
            fieldAttachments.map((attachment, index) => {
              const hasDivider = index !== fieldAttachments.length - 1;
              return (
                <AttachmentItem
                    key={`document-${attachment.id}`}
                    divider={hasDivider}
                    file={attachment}
                    itemId={attachment.id}
                    onDelete={this.onDelete} />
              );
            })
          }
        </List>
      </AccordionSection>
    );
  }
}

export default AttachmentsField;
