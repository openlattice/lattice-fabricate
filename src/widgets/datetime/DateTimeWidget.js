// @flow
import React, { useCallback } from 'react';

import { DateTimePicker } from 'lattice-ui-kit';

import type { WidgetProps } from '../types';

const DateTimeWidget = (props :WidgetProps) => {

  const {
    disabled,
    id,
    onChange,
    readonly,
    value,
  } = props;

  // RJSF requires date/times to be undefined to trigger required validation
  const handleChange = useCallback((newValue :string) => {
    if (newValue === '') {
      onChange(undefined);
    }
    else {
      onChange(newValue);
    }
  }, [onChange]);

  return (
    <DateTimePicker
        disabled={disabled || readonly}
        id={id}
        onChange={handleChange}
        value={value} />
  );
};

export default DateTimeWidget;
