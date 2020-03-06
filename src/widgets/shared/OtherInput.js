// @flow
import React from 'react';

import styled from 'styled-components';
import { getWidget } from 'react-jsonschema-form/lib/utils';

import type { WidgetProps } from '../types';

const OtherWrapper = styled.div`
  margin-top: 10px;
`;

const OtherInput = (props :WidgetProps) => {
  const {
    autofocus,
    disabled,
    readonly,
    id,
    name,
    onBlur,
    onChange,
    onFocus,
    registry,
    schema,
    value = ''
  } = props;
  const { widgets } = registry;

  const OtherWidget = getWidget({ type: 'string' }, 'BaseInput', widgets);
  return (
    <OtherWrapper>
      <OtherWidget
          autofocus={autofocus}
          id={`${id}_other`}
          disabled={disabled}
          readonly={readonly}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          schema={schema}
          type="text"
          value={value} />
    </OtherWrapper>
  );
};

export default OtherInput;
