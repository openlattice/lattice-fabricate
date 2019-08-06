// @flow
import React, { Component } from 'react';
import { DatePicker } from 'lattice-ui-kit';

import KeyCodes from '../constants/KeyCodes';
import type { WidgetProps } from '../types';

class DateWidget extends Component<WidgetProps> {

  static defaultProps = {
    value: ''
  };

  onChange = (value :string) => {
    const { onChange } = this.props;
    onChange(value);
  }

  onKeyDown = (e :SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (e.key === KeyCodes.ENTER) {
      e.preventDefault();
    }
  }

  onFocus = (e :SyntheticFocusEvent<HTMLInputElement>) => {
    const { onFocus, id } = this.props;
    const { value } = e.currentTarget;
    if (onFocus) {
      onFocus(id, value);
    }
  }

  onBlur = (e :SyntheticFocusEvent<HTMLInputElement>) => {
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
      rawErrors,
      readonly,
      value,
      ...restProps
    } = this.props;

    return (
      <DatePicker
          autoFocus={autofocus}
          isDisabled={disabled || readonly}
          id={id}
          isInvalid={rawErrors && rawErrors.length}
          selectProps={{
            onKeyDown: this.onKeyDown
          }}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          value={value}
          {...restProps} />
    );
  }
}

export default DateWidget;
