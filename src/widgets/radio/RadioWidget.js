// @flow
import React, { Component } from 'react';

import styled, { css } from 'styled-components';
import { Radio } from 'lattice-ui-kit';

import KeyCodes from '../constants/KeyCodes';
import type { WidgetProps } from '../types';

const StyledRow = styled.div`
  display: grid;
  grid-auto-flow: ${(props) => (props.inline ? 'column' : 'row')};
  grid-template-columns: ${(props) => (props.inline && props.columns ? css`repeat(${props.columns}, 1fr)` : '1fr')};
`;

class RadioWidget extends Component<WidgetProps> {

  onKeyDown = (e :SyntheticKeyboardEvent<*>) => {
    if (e.key === KeyCodes.ENTER) {
      e.preventDefault();
    }
  }

  render() {
    const {
      autofocus,
      disabled,
      id,
      name,
      onBlur,
      onChange,
      onFocus,
      options,
      readonly,
      required,
      value
    } = this.props;

    const { enumOptions, inline } = options;
    return (
      <StyledRow inline={inline} columns={enumOptions.length}>
        {enumOptions.map((option, i) => {
          const checked = option.value === value;
          const radio = (
            <Radio
                autoFocus={autofocus && i === 0}
                checked={checked}
                disabled={disabled || readonly}
                label={option.label}
                name={name}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={() => onChange(option.value)}
                onKeyDown={this.onKeyDown}
                required={required}
                type="radio"
                value={option.value} />
          );

          return (
            <div key={`${id}_${option.label}`}>
              {radio}
            </div>
          );
        })}
      </StyledRow>
    );
  }
}

export default RadioWidget;
