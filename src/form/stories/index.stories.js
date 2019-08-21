import React from 'react';
import { Card } from 'lattice-ui-kit';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { schema as simpleSchema, uiSchema as simpleUiSchema } from './constants/simpleSchemas';
import { schema as arraySchema, uiSchema as arrayUiSchema } from './constants/arraySchemas';
import { schema as filesSchema, uiSchema as filesUiSchema } from './constants/fileSchemas';

import FormContainer from './FormContainer';
import Form from '..';

storiesOf('Form', module)
  .add('Simple', () => (
    <Card>
      <Form
          schema={simpleSchema}
          uiSchema={simpleUiSchema} />
    </Card>
  ))
  .add('Array', () => (
    <Card>
      <Form
          schema={arraySchema}
          uiSchema={arrayUiSchema} />
    </Card>
  ))
  .add('Data Processing w/ Edits & Delete', () => (
    <Card>
      <FormContainer submitAction={action('Submit Form')} />
    </Card>
  ))
  .add('Files', () => (
    <Card>
      <Form
          schema={filesSchema}
          uiSchema={filesUiSchema}
          onSubmit={action('Submit Form')} />
    </Card>
  ));
