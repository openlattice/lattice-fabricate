// @flow
import React from 'react';

import styled, { css } from 'styled-components';
import { getWidget } from 'react-jsonschema-form/lib/utils';

import type { WidgetProps } from '../../../types';

const OtherWrapper = styled.div`
  grid-column: ${(props) => (props.columns ? css`auto / span ${props.columns}` : '1fr')};
`;

const OtherInput = (props :WidgetProps) => {
  const {
    autofocus,
    id,
    name,
    onBlur,
    onChange,
    onFocus,
    options,
    registry,
    schema,
    value = ''
  } = props;
  const { widgets } = registry;
  const { columns } = options;

  const OtherWidget = getWidget({ type: 'string' }, 'BaseInput', widgets);
  return (
    <OtherWrapper columns={columns}>
      <OtherWidget
          autofocus={autofocus}
          id={`${id}_other`}
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
