// @flow
import React, { useState } from 'react';

import styled from 'styled-components';
import { Input, StyleUtils } from 'lattice-ui-kit';

import { isDefined } from '../../utils/LangUtils';
import type { WidgetProps } from '../types';

const { media } = StyleUtils;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns:${(props) => `${props.flexOptions[0]}fr ${props.flexOptions[1]}fr`};
  grid-gap: 20px;
  margin-bottom: 15px;
  align-items: center;

  >span {
    font-size: 14px;
  }

  ${media.phone`
    display: ${(props) => (!props.wrapInput ? 'grid' : 'block')};
  `}
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

  inputProps.type = schema.items.type;

  if (inputProps.type === 'number' || inputProps.type === 'integer') {
    if (isDefined(schema.items.maximum)) inputProps.max = schema.items.maximum;
    if (isDefined(schema.items.minimum)) inputProps.min = schema.items.minimum;
    if (isDefined(schema.items.multipleOf)) inputProps.step = schema.items.multipleOf;
  }

  inputProps.placeholder = isDefined(schema.items.placeHolder) ? schema.items.placeHolder : '';

  const { enumOptions } = options;

  const [inputValues, setInputValues] = useState(
    enumOptions.reduce((obj, option) => ({
      ...obj,
      [option.value]: inputProps.placeholder,
    }), {})
  );

  const getFlexOptions = () => {
    const { flexOptions } = options;
    if (flexOptions && flexOptions.length === 2) {
      const types = flexOptions.map((factor) => typeof factor);
      if (types[0] === 'number' && types[1] === 'number') {
        return flexOptions;
      }
    }
    return [1, 1];
  };

  const getWrapInputOption = () => {
    const { wrapInput } = options;
    if (isDefined(wrapInput) && typeof wrapInput === 'boolean') {
      return wrapInput;
    }
    return true;
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

  const flexOptions = getFlexOptions();
  const wrapInput = getWrapInputOption();

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div id={id}>
      {
        enumOptions.map((option) => (
          <InputWrapper key={option.value} flexOptions={flexOptions} wrapInput={wrapInput}>
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
