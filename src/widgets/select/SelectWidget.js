// @flow

import React, { Component } from 'react';

import { Creatable, Select } from 'lattice-ui-kit';

type Option = {
  label :string;
  value :string | number;
};

type Props = {
  autofocus ?:boolean;
  disabled ?:boolean;
  id :string;
  multiple ?:boolean;
  onChange :(value :any) => void;
  options :{
    creatable :?boolean;
    enumOptions :Option[];
    hideMenu :?boolean;
    placeholder :?string;
  };
  rawErrors ?:string[];
  required :boolean;
  schema :any;
  value :any;
};

type State = {
  value?:Option | Option[];
};

class SelectWidget extends Component<Props, State> {
  static defaultProps = {
    autofocus: false,
    multiple: false,
    disabled: false
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
            onChange={this.handleChange}
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
          onChange={this.handleChange}
          options={selectOptions}
          useRawValues
          value={value} />
    );
  }
}

export default SelectWidget;
