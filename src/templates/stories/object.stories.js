import { useReducer, useRef } from 'react';

import { action } from '@storybook/addon-actions';
import { DateTime } from 'luxon';
import { NIL } from 'uuid';

import Form from '../../form';
import { schema as simpleSchema, uiSchema as simpleUiSchema } from '../../form/stories/constants/simpleSchemas';

export default {
  title: 'Field IDs',
};

const defaultFormData = {
  personSection: {
    _id: '1234567890'
  }
};

const defaultAttachments = {
  1234567890: [{
    date: '01-01-1970 10:10 PM',
    fieldId: '1234567890',
    href: 'reallyreallyreallylongtesthrefthing',
    id: '0',
    name: 'reallyreallyreallylongtesthrefthing.pdf',
    type: 'application/pdf',
  },
  {
    date: '01-01-1970 10:10 PM',
    fieldId: '1234567890',
    href: 'test2',
    id: '1',
    name: 'test2.pdf',
    type: 'application/pdf',
  }]
};

const defaultState = {
  attachments: defaultAttachments,
  formData: defaultFormData,
};

const reducer = (state, reducerAction) => {
  switch (reducerAction.type) {
    case 'drop': {
      const {
        file,
        fieldId,
        formData,
      } = reducerAction.value;
      const newAttachments = {
        ...state.attachments,
        [fieldId]: (state.attachments[fieldId] || []).concat({
          name: file.name,
          type: file.type,
          href: 'test',
          date: DateTime.local().toLocaleString(DateTime.DATETIME_FULL)
        })
      };
      return { attachments: newAttachments, formData };
    }

    case 'delete': {
      const { attachment, formData } = reducerAction.value;
      const fieldAttachments = state.attachments[attachment.fieldId];
      const newAttachments = {
        ...state.attachments,
        [attachment.fieldId]: fieldAttachments.filter((item) => item.id !== attachment.id)
      };
      return {
        attachments: newAttachments,
        formData
      };
    }

    default:
      return state;
  }
};

const Template = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const formRef = useRef();

  const onDrop = (file, _, fieldId, formData) => {
    dispatch({
      type: 'drop',
      value: {
        file,
        fieldId,
        formData
      }
    });

    action('drop file')(file, _, fieldId, formData);
  };

  const onDeleteAttachment = (attachment, formData) => {
    dispatch({
      type: 'delete',
      value: {
        attachment,
        formData,
      },
    });

    action('delete attachment')(attachment, formData);
  };

  const formContext = {
    attachmentDestinationId: NIL,
    onDrop,
    onDeleteAttachment,
    attachments: state.attachments,
    formRef,
  };

  return (
    <Form
        formData={state.formData}
        ref={formRef}
        formContext={formContext}
        onSubmit={action('Submit Form')}
        schema={simpleSchema}
        uiSchema={simpleUiSchema} />
  );
};

export const Attachments = Template.bind({});
