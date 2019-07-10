import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { schema as simpleSchema, uiSchema as simpleUiSchema } from './constants/simpleSchemas';
import { schema as arraySchema, uiSchema as arrayUiSchema } from './constants/arraySchemas';
import { ObjectFieldTemplate } from '../../templates';

import Form from '..';
import FormContainer from './FormContainer';

storiesOf('Form', module)
  .add('Simple', () => (
    <Form
        ObjectFieldTemplate={ObjectFieldTemplate}
        schema={simpleSchema}
        uiSchema={simpleUiSchema} />
  ))
  .add('Array', () => (
    <Form
        // https://react-jsonschema-form.readthedocs.io/en/latest/validation/#live-validation
        // liveValidate is expensive as RJSF checks all fields for each update.
        // Consider only doing so when a submit has already occurred or debounce/onBlur
        // liveValidate
        ObjectFieldTemplate={ObjectFieldTemplate}
        schema={arraySchema}
        uiSchema={arrayUiSchema} />
  ))
  .add('Data Processing', () => (
    <FormContainer submitAction={action('Submit Form')} />
  ));
