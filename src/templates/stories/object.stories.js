import { action } from '@storybook/addon-actions';

import Form from '../../form';
import { schema as simpleSchema, uiSchema as simpleUiSchema } from '../../form/stories/constants/simpleSchemas';

export default {
  title: 'Field IDs',
};

const Template = (args) => {
  return (
    <Form
        onChange={action('input change')}
        onSubmit={action('Submit Form')}
        schema={simpleSchema}
        uiSchema={simpleUiSchema} />
  );
};

export const Attachments = Template.bind({});
Attachments.args = {

};
