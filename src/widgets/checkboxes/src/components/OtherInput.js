// @flow
import React from 'react';

import styled, { css } from 'styled-components';
import { getWidget } from 'react-jsonschema-form/lib/utils';

const OtherWrapper = styled.div`
  grid-column: ${(props) => (props.columns ? css`auto / span ${props.columns}` : '1fr')};
`;

type Props = {
  id :string;
  onBlur :() => void;
  onFocus :() => void;
  registry :Object;
  onChange :(value :any) => void;
  columns ?:number;
  value :any;
};

const OtherInput = (props :Props) => {
  const {
    columns,
    id,
    onBlur,
    onChange,
    onFocus,
    registry,
    value = ''
  } = props;
  const { widgets } = registry;

  const OtherWidget = getWidget({ type: 'string' }, 'BaseInput', widgets);
  return (
    <OtherWrapper columns={columns}>
      <OtherWidget
          schema
          type="text"
          id={`${id}_other`}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          value={value} />
    </OtherWrapper>
  );
};

OtherInput.defaultProps = {
  columns: 1
};

export default OtherInput;
