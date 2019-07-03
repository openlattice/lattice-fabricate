// @flow
import React from 'react';
import styled from 'styled-components';
import { Button } from 'lattice-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const StyledButton = styled(Button)`
  padding: 0;
`;

type Props = {
  onClick :() => void;
  icon :IconDefinition;
}

const IconButton = (props :Props) => {
  const { icon, onClick, ...restProps } = props;
  return (
    <StyledButton mode="subtle" onClick={onClick} {...restProps}>
      <FontAwesomeIcon icon={icon} fixedWidth />
    </StyledButton>
  );
};

export default IconButton;
