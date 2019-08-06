import React from 'react';
import { storiesOf } from '@storybook/react';
import { schema as numberSchema, uiSchema as numberUiSchema } from './constants/numbersSchemas';
import { schema as datetimeSchema, uiSchema as datetimeUiSchema } from './constants/datetimeSchemas';

import Form from '../../form';

storiesOf('Widgets', module)
  .add('Number', () => (
    <Form schema={numberSchema} uiSchema={numberUiSchema} />
  ))
  .add('Date & Time', () => (
    <Form schema={datetimeSchema} uiSchema={datetimeUiSchema} />
  ));
