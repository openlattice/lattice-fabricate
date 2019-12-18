// @flow

import React, { Component } from 'react';

import styled, { css } from 'styled-components';
import {
  getWidget,
  optionsList,
  retrieveSchema
} from 'react-jsonschema-form/lib/utils';

import OtherInput from './OtherInput';

import type { WidgetProps } from '../../../types';

const selectValue = (value, selected) => selected.concat(value);

const deselectValue = (value, selected :any[]) => selected.filter((v) => v !== value);

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.columns ? css`repeat(${props.columns}, 1fr)` : '1fr')};
`;

const otherSchema = {
  type: 'string',
};

class CheckboxesWidget extends Component<WidgetProps> {

  static defaultProps = {
    autofocus: false,
    disabled: false,
    readonly: false,
    value: []
  };

  componentDidUpdate(prevProps :WidgetProps) {
    const {
      value,
      registry,
      schema,
      onChange
    } = this.props;
    const { value: prevFormData } = prevProps;
    const { definitions } = registry;
    const itemsSchema = retrieveSchema(schema.items, definitions, prevFormData);
    const enumOptions = optionsList(itemsSchema);
    const otherValueIndex = this.getOtherValueIndex(value, enumOptions);

    if (prevFormData.includes('Other') && !value.includes('Other') && otherValueIndex !== -1) {
      const copyFormData = [...value];
      copyFormData.splice(otherValueIndex, 1);
      onChange(copyFormData);
    }
  }

  getHandleChange = (option :HTMLOptionElement) => (checked :boolean) => {
    const { onChange, value } = this.props;
    if (checked) {
      onChange(selectValue(option.value, value));
    }
    else {
      onChange(deselectValue(option.value, value));
    }
  }

  handleOtherChange = (otherValue :string = '') => {
    const {
      value,
      registry,
      schema,
      onChange
    } = this.props;
    const copyFormData = [...value];
    const { definitions } = registry;
    const itemsSchema = retrieveSchema(schema.items, definitions, otherValue);
    const enumOptions = optionsList(itemsSchema);
    const otherIndex = this.getOtherValueIndex(value, enumOptions);

    if (otherIndex !== -1) {
      copyFormData[otherIndex] = otherValue;
      onChange(copyFormData);
    }
    else {
      onChange([...copyFormData, otherValue]);
    }
  }

  getOtherValueIndex = (value :Array<string>, enumOptions :Array<HTMLOptionElement>) :number => {
    const index = value.findIndex((v) => {
      return !enumOptions.find((option) => option.value === v);
    });
    return index;
  }

  render() {
    const {
      autofocus,
      disabled,
      formContext,
      id,
      onBlur,
      onFocus,
      options,
      readonly,
      registry,
      schema,
      value,
    } = this.props;
    console.log(schema);
    const { widgets, definitions } = registry;
    const itemsSchema = retrieveSchema(schema.items, definitions, value);
    const enumOptions = optionsList(itemsSchema);
    const {
      widget = 'CheckboxWidget',
      columns,
      withOther
    } = options;

    const Widget = getWidget(schema, widget, widgets);
    const otherValueIndex :number = this.getOtherValueIndex(value, enumOptions);
    const otherValue = value[otherValueIndex];
    const showOther = withOther && value.includes('Other');
    return (
      <>
        <GridDiv className="checkboxes" id={id} columns={columns}>
          {enumOptions.map((option, index) => {
            const checked = value.indexOf(option.value) !== -1;
            return (
              <Widget
                  id={`${id}_${index}`}
                  key={`checkboxes${index}`} // eslint-disable-line react/no-array-index-key
                  autoFocus={autofocus}
                  disabled={disabled || readonly}
                  label={option.label}
                  onBlur={onBlur}
                  onChange={this.getHandleChange(option)}
                  onFocus={onFocus}
                  schema={itemsSchema}
                  value={checked} />
            );
          })}
          { showOther && (
            <OtherInput
                autofocus
                disabled={disabled}
                formContext={formContext}
                id={id}
                name="otherInput"
                onBlur={onBlur}
                onChange={this.handleOtherChange}
                onFocus={onFocus}
                options={options}
                rawErrors={[]}
                readonly={readonly}
                registry={registry}
                required={false}
                schema={otherSchema}
                type="text"
                value={otherValue} />
          )}
        </GridDiv>
      </>
    );
  }
}

export default CheckboxesWidget;
