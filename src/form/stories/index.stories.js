import React from 'react';
import { storiesOf } from '@storybook/react';
import { schema, uiSchema } from './constants/mockSchema';
import { ObjectFieldTemplate } from '../../templates';

import Form from '../components/Form';

storiesOf('Form', module)
  .add('with text', () => (
    <Form
        ObjectFieldTemplate={ObjectFieldTemplate}
        schema={schema}
        uiSchema={uiSchema} />
  ));
