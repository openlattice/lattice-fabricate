import React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Card } from 'lattice-ui-kit';

import { schema as checkboxesSchema, uiSchema as checkboxesUiSchema } from './constants/checkboxesSchemas';
import { schema as datetimeSchema, uiSchema as datetimeUiSchema } from './constants/datetimeSchemas';
import { schema as numberSchema, uiSchema as numberUiSchema } from './constants/numbersSchemas';

import Form from '../../form';

const dateTimeFormData = {
  date: '2019-09-28',
  time: '23:11'
};

storiesOf('Widgets', module)
  .add('Number', () => (
    <Form schema={numberSchema} uiSchema={numberUiSchema} />
  ))
  .add('Checkboxes', () => (
    <Card>
      <Form
          onSubmit={action('Submit Form')}
          schema={checkboxesSchema}
          uiSchema={checkboxesUiSchema} />
    </Card>
  ))
  .add('Date & Time', () => (
    <Form
        formData={dateTimeFormData}
        onSubmit={action('Submit')}
        schema={datetimeSchema}
        uiSchema={datetimeUiSchema} />
  ));
