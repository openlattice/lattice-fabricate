import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';

import CheckboxesWidget from './CheckboxesWidget';

import CheckboxWidget from '../../../checkbox/CheckboxWidget';
import Form from '../../../../form';
import { INVALID_PARAMS } from '../../../../utils/testing/Invalid';

const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
const OTHER_TEXT = 'otherText';

const schema = {
  type: 'object',
  title: 'Checkboxes',
  properties: {
    checkboxesOther: {
      title: 'Options (ui:options flag: withOther + otherText)',
      type: 'array',
      description: 'Select all that apply',
      items: {
        type: 'string',
        enum: OPTIONS,
      },
      minItems: 1,
      uniqueItems: true,
    }
  }
};

const createSchema = (otherText) => ({
  classNames: 'column-span-12',
  checkboxesOther: {
    classNames: 'column-span-12',
    'ui:widget': 'checkboxes',
    'ui:options': {
      withOther: true,
      otherText
    }
  }
});

const MockForm = (props) => {
  const { otherText, ...otherProps } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (<Form schema={schema} uiSchema={createSchema(otherText)} {...otherProps} />);
};

describe('CheckboxesWidget', () => {
  test('should match snapshot', () => {
    const wrapper = mount(<MockForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should render Checkboxes with additional Other checkbox input', () => {
    const wrapper = mount(<MockForm otherText={OTHER_TEXT} />);

    expect(wrapper.find(CheckboxWidget)).toHaveLength(OPTIONS.length + 1);

    // last checkbox should have otherText value
    expect(wrapper.find(CheckboxWidget).last().text()).toEqual(OTHER_TEXT);
  });

  test('should pass withOther and otherText props to the widget', () => {
    const wrapper = mount(<MockForm otherText={OTHER_TEXT} />);

    const options = wrapper.find(CheckboxesWidget).prop('options');
    expect(options).toHaveProperty('withOther', true);
    expect(options).toHaveProperty('otherText', OTHER_TEXT);
  });

  test('when otherText is undefined, last checkbox should be labelled Other', () => {
    const wrapper = mount(<MockForm />);
    expect(wrapper.find(CheckboxWidget).last().text()).toEqual('Other');
  });

  test('should display input text when last checkbox is checked, and hide when unchecked', () => {
    const wrapper = mount(<MockForm />);
    expect(wrapper.find('input[type="text"]')).toHaveLength(0);

    const widget = wrapper.find(CheckboxWidget).last();
    widget.find('input[type="checkbox"]').simulate('change', { target: { checked: true } });
    wrapper.update();
    expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    expect(wrapper.find('input[type="text"]').prop('value')).toEqual('');

    // uncheck
    widget.find('input[type="checkbox"]').simulate('change', { target: { checked: false } });
    wrapper.update();
    expect(wrapper.find('input[type="text"]')).toHaveLength(0);
  });

  test('otherText should be a nonEmptyString string, else default to Other', () => {
    INVALID_PARAMS.forEach((param) => {
      const wrapper = mount(<MockForm otherText={param} />);
      expect(wrapper.find(CheckboxWidget).last().text()).toEqual('Other');
    });
  });
});
