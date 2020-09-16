// @flow
import React, { useState } from 'react';

import styled from 'styled-components';
import { Input } from 'lattice-ui-kit';

import type { WidgetProps } from '../../../types';

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns:${(props) => `${props.flexRatios[0]}fr ${props.flexRatios[1]}fr`};
  grid-gap: 20px;
  margin-bottom: 15px;
  align-items: center;

  >span {
    font-size: 14px;
  }
`;

const MultiInputWidget = (props :WidgetProps) => {

  const {
    autofocus,
    disabled,
    formContext,
    id,
    onBlur,
    onFocus,
    options,
    rawErrors,
    readonly,
    registry,
    schema,
    value,
    onChange,
    ...inputProps
  } = props;

  inputProps.type = 'text';

  if (options.inputType) {
    inputProps.type = options.inputType;
  }

  const { enumOptions } = options;

  const [inputValues, setInputValues] = useState(
    enumOptions.reduce((obj, option) => ({
      ...obj,
      [option.value]: '',
    }), {})
  );

  const getFlexRatios = () => {
    const { flexOptions } = options;
    if (flexOptions && flexOptions.length === 2) {
      const types = flexOptions.map((factor) => typeof factor);
      if (types[0] === 'number' && types[1] === 'number') {
        return flexOptions;
      }
    }
    return [1, 1];
  };

  const handleOnChange = (event :SyntheticInputEvent<HTMLInputElement>) => {
    const { target } = event;

    const newValues = {
      ...inputValues,
      [target.name]: target.value
    };
    setInputValues(newValues);

    if (schema.items.type === 'object') {
      onChange(
        Object.entries(newValues).map(([key, val]) => ({
          [key]: val
        }))
      );
    }
    else if (schema.items.type === 'number') {
      onChange(Object.values(newValues).map((val) => parseFloat(val)));
    }
    else {
      onChange(Object.values(newValues));
    }
  };

  const flexRatios = getFlexRatios();

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div id={id}>
      {
        enumOptions.map((option) => (
          <InputWrapper key={option.value} flexRatios={flexRatios}>
            <span>
              {option.label}
            </span>
            <Input
                autoFocus={autofocus}
                id={option.value}
                disabled={disabled}
                readOnly={readonly}
                onBlur={onBlur}
                invalid={rawErrors && rawErrors.length}
                onChange={handleOnChange}
                onFocus={onFocus}
                name={option.value}
                schema={schema}
                value={inputValues[option.value]}
                {...inputProps} />
          </InputWrapper>
        ))
      }
    </div>
  );
  /* eslint-enable */
};

export default MultiInputWidget;
