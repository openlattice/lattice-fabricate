// @flow
import React from 'react';

import styled, { css } from 'styled-components';
import { getWidget } from 'react-jsonschema-form/lib/utils';

const OtherWrapper = styled.div`
  grid-column: ${(props) => (props.columns ? css`auto / span ${props.columns}` : '1fr')};
`;

type Props = {
  formData :any[];
  idSchema :Object;
  onBlur :() => void;
  onFocus :() => void;
  registry :Object;
  onChange :(value :any) => void;
  columns ?:number;
  otherValueIndex :number;
  withOther :boolean;
};

const OtherInput = (props :Props) => {
  const {
    columns,
    formData,
    idSchema,
    onBlur,
    onChange,
    onFocus,
    otherValueIndex,
    registry,
    withOther,
  } = props;

  if (withOther && formData.includes('Other')) {
    const { widgets } = registry;
    const { $id: id } = idSchema;

    const OtherWidget = getWidget({ type: 'string' }, 'BaseInput', widgets);

    const otherValue = formData[otherValueIndex] || '';
    return (
      <OtherWrapper columns={columns}>
        <OtherWidget
            schema
            type="text"
            id={`${id}_other`}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            value={otherValue} />
      </OtherWrapper>
    );
  }

  return null;
};

OtherInput.defaultProps = {
  columns: 1
};

export default OtherInput;
