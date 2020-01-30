import React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Card } from 'lattice-ui-kit';

import { schema as checkboxesSchema, uiSchema as checkboxesUiSchema } from './constants/checkboxesSchemas';
import { schema as datetimeSchema, uiSchema as datetimeUiSchema } from './constants/datetimeSchemas';
import { schema as numberSchema, uiSchema as numberUiSchema } from './constants/numbersSchemas';
import { schema as radioSchema, uiSchema as radioUiSchema } from './constants/radioSchemas';
import { schema as selectSchema, uiSchema as selectUiSchema } from './constants/selectSchemas';
import * as SignatureSchemas from './constants/signatureSchemas';

import Form from '../../form';

const dateTimeFormData = {
  date: '2019-09-28',
  time: '23:11'
};

storiesOf('Widgets', module)
  .addDecorator((storyFn) => (
    <Card>
      {storyFn()}
    </Card>
  ))
  .add('Number', () => (
    <Form schema={numberSchema} uiSchema={numberUiSchema} />
  ))
  .add('Checkboxes', () => (
    <Form
        onSubmit={action('Submit Form')}
        schema={checkboxesSchema}
        uiSchema={checkboxesUiSchema} />
  ))
  .add('Date & Time', () => (
    <Form
        formData={dateTimeFormData}
        onSubmit={action('Submit')}
        schema={datetimeSchema}
        uiSchema={datetimeUiSchema} />
  ))
  .add('Radio', () => (
    <Form
        onSubmit={action('Submit Form')}
        schema={radioSchema}
        uiSchema={radioUiSchema} />
  ))
  .add('Select', () => (
    <Form
        onSubmit={action('Submit')}
        schema={selectSchema}
        uiSchema={selectUiSchema} />
  ))
  .add('Signature', () => (
    <Form
        onSubmit={action('Submit')}
        schema={SignatureSchemas.dataSchema}
        uiSchema={SignatureSchemas.uiSchema} />
  ));
