// @flow

import React, { Component } from 'react';

import { utils } from '@rjsf/core';
import { ChoiceGroup } from 'lattice-ui-kit';

import OtherInput from '../../../shared/OtherInput';
import type { WidgetProps } from '../../../types';

const {
  getWidget,
  optionsList,
  retrieveSchema
} = utils;

const selectValue = (value, selected :any[], withNone :boolean) => {
  if (withNone) return selected.filter((v) => v !== 'None').concat(value);
  return selected.concat(value);
};

const deselectValue = (value, selected :any[]) => selected.filter((v) => v !== value);

const getOtherValueIndex = (value :Array<string>, enumOptions :Object[]) :number => value
  .findIndex((v) => !enumOptions.find((option) => option.value === v));

const getOptionsList = (itemsSchema, withNone, withOther) => {
  const options :Object[] = optionsList(itemsSchema);
  let shallowOptions = [...options];
  if (withNone) shallowOptions = shallowOptions.concat({ label: 'None', value: 'None' });
  if (withOther) shallowOptions = shallowOptions.concat({ label: 'Other', value: 'Other' });

  return shallowOptions;
};

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
      onChange,
      options,
      registry,
      schema,
    } = this.props;
    const {
      withNone = false,
      withOther = false
    } = options;
    const { value: prevFormData } = prevProps;
    const { definitions } = registry;
    const itemsSchema = retrieveSchema(schema.items, definitions, prevFormData);
    const enumOptions = getOptionsList(itemsSchema, withNone, withOther);
    const otherValueIndex = getOtherValueIndex(value, enumOptions);

    if (prevFormData.includes('Other') && !value.includes('Other') && otherValueIndex !== -1) {
      const copyFormData = [...value];
      copyFormData.splice(otherValueIndex, 1);
      onChange(copyFormData);
    }
  }

  getHandleChange = (option :Object, withNone :boolean) => (checked :boolean) => {
    const { onChange, value } = this.props;

    if (checked) {
      if (withNone && option.value === 'None') {
        onChange(['None']);
      }
      else {
        onChange(selectValue(option.value, value, withNone));
      }
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
      onChange,
      options
    } = this.props;
    const copyFormData = [...value];
    const {
      withNone = false,
      withOther = false
    } = options;
    const { definitions } = registry;
    const itemsSchema = retrieveSchema(schema.items, definitions, otherValue);
    const enumOptions = getOptionsList(itemsSchema, withNone, withOther);
    const otherIndex = getOtherValueIndex(value, enumOptions);

    if (otherIndex !== -1) {
      copyFormData[otherIndex] = otherValue;
      onChange(copyFormData);
    }
    else {
      onChange([...copyFormData, otherValue]);
    }
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

    const {
      columns,
      mode,
      row,
      widget = 'CheckboxWidget',
      withNone = false,
      withOther = false,
    } = options;
    const { widgets, definitions } = registry;
    const itemsSchema = retrieveSchema(schema.items, definitions, value);
    const enumOptions = getOptionsList(itemsSchema, withNone, withOther);
    const Widget = getWidget(schema, widget, widgets);
    const otherValueIndex :number = getOtherValueIndex(value, enumOptions);
    const otherValue = value[otherValueIndex];
    const showOther = withOther && value.includes('Other');

    return (
      <>
        <ChoiceGroup className="checkboxes" id={id} columns={columns} row={row}>
          {enumOptions.map((option) => {
            const checked = value.indexOf(option.value) !== -1;
            return (
              <Widget
                  mode={mode}
                  id={`${id}_${option.value}`}
                  key={`checkboxes_${option.value}`}
                  autoFocus={autofocus}
                  disabled={disabled || readonly}
                  label={option.label}
                  onBlur={onBlur}
                  onChange={this.getHandleChange(option, withNone)}
                  onFocus={onFocus}
                  schema={itemsSchema}
                  value={checked} />
            );
          })}
        </ChoiceGroup>
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
      </>
    );
  }
}

export default CheckboxesWidget;
