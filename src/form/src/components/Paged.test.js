// @flow
import React from 'react';

import { mount } from 'enzyme';

import Form from './Form';
import Paged from './Paged';

import { schemas, uiSchemas } from '../../stories/constants/pagedSchemas';

const mockRender = ({
  formRef,
  pagedData,
  page,
  onBack,
  onNext,
  validateAndSubmit,
} :any) => (
  <>
    <Form
        formData={pagedData}
        hideSubmit
        ref={formRef}
        onSubmit={onNext}
        schema={schemas[page]}
        uiSchema={uiSchemas[page]} />
    <button
        id="back-button"
        type="button"
        onClick={onBack}>
        Back
    </button>
    <button
        id="next-button"
        type="submit"
        onClick={validateAndSubmit}>
      Next
    </button>
  </>
);

describe('Paged', () => {

  describe('render', () => {
    test('should invoke render prop', () => {
      const wrapper = mount(<Paged render={mockRender} />);
      expect(wrapper.find(Form)).toHaveLength(1);
    });
  });

  describe('initialPage', () => {
    test('should default to first page (0)', () => {
      const wrapper = mount(
        <Paged
            render={mockRender} />
      );
      expect(wrapper.find(Form).props().schema).toEqual(schemas[0]);
      expect(wrapper.find(Form).props().uiSchema).toEqual(uiSchemas[0]);
    });

    test('should control page when changed', () => {
      const wrapper = mount(
        <Paged
            initialPage={1}
            render={mockRender} />
      );
      expect(wrapper.find(Form).props().schema).toEqual(schemas[1]);
      expect(wrapper.find(Form).props().uiSchema).toEqual(uiSchemas[1]);
    });
  });

  describe('validateAndSubmit', () => {
    test('should trigger form validation before proceeding', () => {
      const mockOnPageChange = jest.fn();
      const wrapper = mount(
        <Paged
            onPageChange={mockOnPageChange}
            render={mockRender} />
      );

      wrapper.find('#next-button').simulate('click');
      wrapper.update();

      expect(mockOnPageChange).not.toHaveBeenCalled();
      expect(wrapper.find('.has-error')).toHaveLength(1);

      wrapper.find('input#root_section1_name').props().onChange({ currentTarget: { value: 'name' } });
      wrapper.find('#next-button').simulate('click');

      expect(wrapper.find('textarea')).toHaveLength(1);
      expect(mockOnPageChange).toHaveBeenCalled();
    });
  });


  describe('onNext/onBack', () => {
    test('should call onPageChange with new page number', () => {
      const mockOnPageChange = jest.fn();
      const wrapper = mount(
        <Paged
            onPageChange={mockOnPageChange}
            render={mockRender} />
      );

      wrapper.find('input#root_section1_name').props().onChange({ currentTarget: { value: 'name' } });
      wrapper.find('#next-button').simulate('click');
      expect(mockOnPageChange).toHaveBeenCalledWith(1);

      wrapper.find('#back-button').simulate('click');
      expect(mockOnPageChange).toHaveBeenCalledWith(0);
    });

    test('should persist state between pages', () => {
      const wrapper = mount(
        <Paged render={mockRender} />
      );

      wrapper.find('input#root_section1_name').props().onChange({ currentTarget: { value: 'name' } });
      wrapper.find('#next-button').simulate('click');

      expect(wrapper.find(Form).props().formData).toEqual({
        section1: {
          name: 'name'
        }
      });

      wrapper.find('#back-button').simulate('click');
      expect(wrapper.find('input#root_section1_name').props().value).toEqual('name');
    });
  });
});
