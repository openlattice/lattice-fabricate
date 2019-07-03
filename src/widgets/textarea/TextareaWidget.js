// @flow
import React, { Component } from 'react';
import { TextArea } from 'lattice-ui-kit';

import KeyCodes from '../constants/KeyCodes';
import type { WidgetProps } from '../types';

class TextareaWidget extends Component<WidgetProps> {

  static defaultProps = {
    value: ''
  };

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
      onChange,
      onFocus,
      options,
      readonly,
      value,
      ...restProps
    } = this.props;

    return (
      <TextArea
          id={id}
          value={value}
          disabled={disabled}
          readOnly={readonly}
          autoFocus={autofocus}
          rows={options.rows}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.onChange}
          {...restProps} />
    );
  }
}

export default TextareaWidget;
