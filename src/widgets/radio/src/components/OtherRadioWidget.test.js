import React from 'react';

import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';

import RadioWidget from './RadioWidget';

import Form from '../../../../form';

const OPTION_ENUMS = ['Option 1', 'Option 2', 'Option 3'];
const formData = {
  radioOther: ['Other', 'OpenLattice']
};
const schema = {
  type: 'object',
  title: 'radio',
  properties: {
    radioOther: {
      title: 'ui:widget: OtherRadioWidget',
      type: 'array',
      items: {
        type: 'string',
        enum: OPTION_ENUMS,
      },
      uniqueItems: true,
    },
  },
};

const uiSchema = {
  classNames: 'column-span-12',
  radioOther: {
    classNames: 'column-span-12',
    'ui:widget': 'OtherRadioWidget',
    'ui:options': {
      withNone: true,
    }
  },
};

// eslint-disable-next-line react/jsx-props-no-spreading
const MockForm = (props) => <Form schema={schema} uiSchema={uiSchema} {...props} />;

describe('OtherRadioWidget', () => {

  test('should match snapshot', () => {
    const wrapper = mount(<MockForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should render RadioWidget with additional Other radio input', () => {
    const wrapper = mount(<MockForm />);
    expect(wrapper.find(RadioWidget)).toHaveLength(1);
    expect(wrapper.find({ type: 'radio', label: 'Other', value: 'Other' })).toHaveLength(1);
  });

  test('selecting Other option should show a text field', () => {
    const mockOnChange = jest.fn();
    const wrapper = mount(<MockForm onChange={mockOnChange} />);
    expect(wrapper.find('input[type="text"]')).toHaveLength(0);

    wrapper.find({ type: 'radio', label: 'Other', value: 'Other' }).prop('onChange')({ target: { checked: true } });
    wrapper.update();

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    const otherInput = wrapper.find('input[type="text"]');
    expect(otherInput).toHaveLength(1);
  });

  test('should populate and change other input', () => {
    const wrapper = mount(<MockForm formData={formData} />);
    expect(wrapper.find('input[type="text"]').prop('value')).toEqual('OpenLattice');
    wrapper.find('input[type="text"]').prop('onChange')({ currentTarget: { value: 'OpenLattice!' } });
    wrapper.update();
    expect(wrapper.find('input[type="text"]').prop('value')).toEqual('OpenLattice!');
    wrapper.find('input[type="text"]').prop('onChange')({ currentTarget: { value: undefined } });
    wrapper.update();
    expect(wrapper.find('input[type="text"]').prop('value')).toEqual('');
  });

  test('should pass options and withOther to the widget', () => {
    const wrapper = mount(<MockForm formData={formData} />);
    const options = wrapper.find(RadioWidget).prop('options');
    expect(options).toHaveProperty('withOther');
    expect(options).toHaveProperty('withNone');
  });
});
