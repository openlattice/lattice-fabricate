// @flow
import React from 'react';
import { Button } from 'lattice-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Props = {
  onClick :() => void;
  icon :IconDefinition;
}

const IconButton = (props :Props) => {
  const { icon, onClick, ...restProps } = props;
  return (
    <Button mode="subtle" onClick={onClick} {...restProps}>
      <FontAwesomeIcon icon={icon} fixedWidth />
    </Button>
  );
};

export default IconButton;
