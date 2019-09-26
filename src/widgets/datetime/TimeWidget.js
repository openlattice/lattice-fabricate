// @flow
import React, { Component } from 'react';
import { TimePicker } from 'lattice-ui-kit';

import KeyCodes from '../constants/KeyCodes';
import type { WidgetProps } from '../types';

class TimeWidget extends Component<WidgetProps> {

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

  onFocus = (id :string, value :any) => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(id, value);
    }
  }

  onBlur = (id :string, value :any) => {
    const { onBlur } = this.props;
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

    /* eslint-disable react/jsx-props-no-spreading */
    return (
      <TimePicker
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
    /* eslint-enable */
  }
}

export default TimeWidget;
