import React, { useRef } from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Button, Card, CardSegment } from 'lattice-ui-kit';

import FormContainer from './FormContainer';
import { schema as arraySchema, uiSchema as arrayUiSchema } from './constants/arraySchemas';
import { schema as filesSchema, uiSchema as filesUiSchema } from './constants/fileSchemas';
import { schema as simpleSchema, uiSchema as simpleUiSchema } from './constants/simpleSchemas';

import Form from '..';

storiesOf('Form', module)
  .add('Simple', () => (
    <Card>
      <Form
          onSubmit={action('Submit Form')}
          schema={simpleSchema}
          uiSchema={simpleUiSchema} />
    </Card>
  ))
  .add('Array', () => (
    <Card>
      <Form
          onSubmit={action('Submit Form')}
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
  ))
  .add('External Submit', () => {
    const formRef = useRef();
    return (
      <Card>
        <CardSegment>
          <Button mode="primary" onClick={() => formRef.current.submit()}>External Submit</Button>
        </CardSegment>
        <Form
            hideSubmit
            ref={formRef}
            schema={simpleSchema}
            uiSchema={simpleUiSchema}
            onSubmit={action('Submit Form')} />
      </Card>
    );
  });
