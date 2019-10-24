// @flow
import React, { useCallback } from 'react';
import { DatePicker } from 'lattice-ui-kit';

import type { WidgetProps } from '../types';

const DateWidget = (props :WidgetProps) => {

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
    <DatePicker
        disabled={disabled || readonly}
        id={id}
        onChange={handleChange}
        value={value} />
  );
};

export default DateWidget;
