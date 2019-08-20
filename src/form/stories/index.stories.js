import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { schema as simpleSchema, uiSchema as simpleUiSchema } from './constants/simpleSchemas';
import { schema as arraySchema, uiSchema as arrayUiSchema } from './constants/arraySchemas';
import { schema as filesSchema, uiSchema as filesUiSchema } from './constants/fileSchemas';

import FormContainer from './FormContainer';
import Form from '..';

storiesOf('Form', module)
  .add('Simple', () => (
    <Form
        schema={simpleSchema}
        uiSchema={simpleUiSchema} />
  ))
  .add('Array', () => (
    <Form
        // https://react-jsonschema-form.readthedocs.io/en/latest/validation/#live-validation
        // liveValidate is expensive as RJSF checks all fields for each update.
        // Consider only doing so when a submit has already occurred or debounce/onBlur
        // liveValidate
        schema={arraySchema}
        uiSchema={arrayUiSchema} />
  ))
  .add('Data Processing w/ Edits & Delete', () => (
    <FormContainer submitAction={action('Submit Form')} />
  ))
  .add('Files', () => (
    <Form
        schema={filesSchema}
        uiSchema={filesUiSchema}
        onSubmit={action('Submit Form')} />
  ));
