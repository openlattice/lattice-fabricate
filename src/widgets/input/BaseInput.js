// @flow

import React, { Component } from 'react';
import { Input } from 'lattice-ui-kit';

import KeyCodes from '../constants/KeyCodes';
import type { WidgetProps } from '../types';

class BaseInput extends Component<WidgetProps> {

  static defaultProps = {
    value: ''
  }

  onChange = (event :SyntheticEvent<*>) => {
    const { onChange, options } = this.props;
    const { value } :HTMLInputElement = event.currentTarget;
    if (onChange) {
      onChange(value === '' ? options.emptyValue : value);
    }
  }

  onKeyDown = (e :SyntheticKeyboardEvent<*>) => {
    if (e.key === KeyCodes.ENTER) {
      e.preventDefault();
    }
  }

  onFocus = (e :SyntheticFocusEvent<*>) => {
    const { onFocus, id } = this.props;
    const { value } = e.currentTarget;
    if (onFocus) {
      onFocus(id, value);
    }
  }

  onBlur = (e :SyntheticFocusEvent<*>) => {
    const { onBlur, id } = this.props;
    const { value } = e.currentTarget;
    if (onBlur) {
      onBlur(id, value);
    }
  }

  render() {
    const {
      autofocus,
      disabled,
      id,
      onBlur,
      onFocus,
      onChange,
      options,
      readonly,
      value,
      ...inputProps
    } = this.props;

    const inputType = options.inputType || inputProps.type || 'text';

    return (
      <Input
          autoFocus={autofocus}
          disabled={disabled}
          id={id}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          readOnly={readonly}
          type={inputType}
          value={value}
          {...inputProps} />
    );
  }
}

export default BaseInput;
