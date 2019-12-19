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
    creatable ?:boolean;
    enumOptions :Option[];
    hideMenu ?:boolean;
    placeholder ?:string;
    multiple ?:boolean;
    noOptionsMessage ?:string;
  };
  rawErrors ?:string[];
  required :boolean;
  schema :any;
  onBlur :(event :SyntheticFocusEvent<HTMLElement>) => void;
  onFocus :(event :SyntheticFocusEvent<HTMLElement>) => void;
  value :any;
};

type State = {
  value?:Option | Option[];
};

class SelectWidget extends Component<Props, State> {
  static defaultProps = {
    autofocus: false,
    disabled: false,
    multiple: false,
    rawErrors: undefined,
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
      placeholder,
      multiple,
      noOptionsMessage,
    } = options;

    const selectOptions = schemaOptions || enumOptions;
    const invalid = rawErrors && rawErrors.length;
    const SelectComponent = creatable ? Creatable : Select;

    return (
      <SelectComponent
          autoFocus={autofocus}
          blurInputOnSelect={!multiple}
          closeMenuOnSelect={!multiple}
          hideMenu={hideMenu}
          id={id}
          invalid={invalid}
          isClearable={!required}
          isDisabled={disabled}
          isMulti={multiple}
          noOptionsMessage={() => noOptionsMessage}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={this.handleChange}
          options={selectOptions}
          placeholder={placeholder}
          useRawValues
          value={value} />
    );
  }
}

export default SelectWidget;
