import React from 'react';
import { storiesOf } from '@storybook/react';
import { schema as simpleSchema, uiSchema as simpleUiSchema } from './constants/simpleSchemas';
import { schema as arraySchema, uiSchema as arrayUiSchema } from './constants/arraySchemas';
import { ObjectFieldTemplate } from '../../templates';

import Form from '..';

storiesOf('Form', module)
  .add('Simple', () => (
    <Form
        ObjectFieldTemplate={ObjectFieldTemplate}
        schema={simpleSchema}
        uiSchema={simpleUiSchema} />
  ))
  .add('Array', () => (
    <Form
        ObjectFieldTemplate={ObjectFieldTemplate}
        schema={arraySchema}
        uiSchema={arrayUiSchema} />
  ));
