// @flow

import React, { Component } from 'react';
import { Select, Createable } from 'lattice-ui-kit';

type Option = {
  label :string,
  value :string | number
};

type Props = {
  id :string,
  options :{
    enumOptions :Option[],
    creatable :?boolean,
    hideMenu :?boolean,
    placeholder :?string
  },
  value :any,
  disabled ? :boolean,
  multiple ? :boolean,
  autofocus ? :boolean,
  onChange :(value :any) => void
};

type State = {
  value? :Option | Option[]
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
      id,
      options,
      disabled,
      multiple,
      autofocus,
      value
    } = this.props;

    const {
      enumOptions = [],
      creatable,
      hideMenu,
      placeholder
    } = options;

    if (creatable) {
      return (
        <Createable
            autoFocus={autofocus}
            hideMenu={hideMenu}
            id={id}
            isDisabled={disabled}
            isMulti={multiple}
            onChange={this.handleChange}
            options={enumOptions}
            placeholder={placeholder}
            useRawValues
            value={value} />
      );
    }

    return (
      <Select
          autoFocus={autofocus}
          id={id}
          isClearable
          isDisabled={disabled}
          isMulti={multiple}
          onChange={this.handleChange}
          options={enumOptions}
          useRawValues
          value={value} />
    );
  }
}

export default SelectWidget;
