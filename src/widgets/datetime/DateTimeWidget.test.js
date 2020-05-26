import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { LatticeLuxonUtils, MuiPickersUtilsProvider } from 'lattice-ui-kit';

import DateTimeWidget from './DateTimeWidget';
import Form from '../../form';

const schema = {
  type: 'object',
  title: 'dateTimeWidget',
  properties: {
    dateTimeWidget: {
      title: 'ui:widget: DateTimeWidget',
      type: 'string',
    },
  },
};

const uiSchema = {
  classNames: 'column-span-12',
  dateTimeWidget: {
    classNames: 'column-span-12',
    'ui:widget': 'DateTimeWidget',
    'ui:options': {
      format: 'MM/dd/yy HH:mm',
      mask: '__/__/__ __:__',
      placeholder: 'MM/DD/YY HH:MM'
    },
  },
};

// eslint-disable-next-line react/jsx-props-no-spreading
const MockForm = (props) => <Form schema={schema} uiSchema={uiSchema} {...props} />;

describe('DateTimeWidget', () => {

  test('should render', () => {
    const wrapper = mount(<MuiPickersUtilsProvider utils={LatticeLuxonUtils}><MockForm /></MuiPickersUtilsProvider>);
    expect(wrapper.find(DateTimeWidget)).toHaveLength(1);
  });

  test('should match snapshot', () => {
    const wrapper = mount(<MuiPickersUtilsProvider utils={LatticeLuxonUtils}><MockForm /></MuiPickersUtilsProvider>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should have ampm in props options', () => {
    const wrapper = mount(<MuiPickersUtilsProvider utils={LatticeLuxonUtils}><MockForm /></MuiPickersUtilsProvider>);
    const dateTimeWidget = wrapper.find(DateTimeWidget).at(0);
    const { options } = dateTimeWidget.props();
    expect(options.mask).toEqual('__/__/__ __:__');
  });
});
