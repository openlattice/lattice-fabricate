import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { schema as numberSchema, uiSchema as numberUiSchema } from './constants/numbersSchemas';
import { schema as datetimeSchema, uiSchema as datetimeUiSchema } from './constants/datetimeSchemas';

import Form from '../../form';

const dateTimeFormData = {
  date: '2019-09-28',
  time: '23:11'
};

storiesOf('Widgets', module)
  .add('Number', () => (
    <Form schema={numberSchema} uiSchema={numberUiSchema} />
  ))
  .add('Date & Time', () => (
    <Form
        formData={dateTimeFormData}
        onSubmit={action('Submit')}
        schema={datetimeSchema}
        uiSchema={datetimeUiSchema} />
  ));
