import React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Card } from 'lattice-ui-kit';

import { schema, uiSchema } from './constants/checkboxesSchemas';

import Form from '../../form';

storiesOf('Fields', module)
  .add('CheckboxArrayField', () => (
    <Card>
      <Form
          onSubmit={action('Submit Form')}
          schema={schema}
          uiSchema={uiSchema} />
    </Card>
  ));
