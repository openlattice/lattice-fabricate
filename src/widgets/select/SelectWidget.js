// @flow

import React, { Component } from 'react';

import { Creatable, Select } from 'lattice-ui-kit';

import type { WidgetProps } from '../types';

type Option = {
  label :string;
  value :string | number;
};

type SelectProps = {|
  ...WidgetProps,
  multiple ? :boolean;
|};

class SelectWidget extends Component<SelectProps> {
  static defaultProps = {
    multiple: false,
  };

  handleChange = (value :Option | Option[]) => {
    const { onChange } = this.props;
    onChange(value);
  }

  render() {
    const {
      autofocus,
      disabled,
      id,
      multiple,
      onBlur,
      onFocus,
      options,
      rawErrors,
      required,
      schema,
      value,
    } = this.props;

    const { options: schemaOptions } = schema;

    const {
      enumOptions = [],
      creatable,
      hideMenu,
      placeholder
    } = options;

    const selectOptions = schemaOptions || enumOptions;
    const invalid = rawErrors && rawErrors.length;

    if (creatable) {
      return (
        <Creatable
            autoFocus={autofocus}
            hideMenu={hideMenu}
            id={id}
            invalid={invalid}
            isDisabled={disabled}
            isMulti={multiple}
            onBlur={onBlur}
            onChange={this.handleChange}
            onFocus={onFocus}
            options={selectOptions}
            placeholder={placeholder}
            useRawValues
            value={value} />
      );
    }


    return (
      <Select
          autoFocus={autofocus}
          id={id}
          invalid={invalid}
          isClearable={!required}
          isDisabled={disabled}
          isMulti={multiple}
          onBlur={onBlur}
          onChange={this.handleChange}
          onFocus={onFocus}
          options={selectOptions}
          useRawValues
          value={value} />
    );
  }
}

export default SelectWidget;
