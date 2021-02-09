// @flow
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'lattice-ui-kit';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Props = {
  onClick :() => void;
  icon :IconDefinition;
}

const IconButton = (props :Props) => {
  const { icon, onClick, ...restProps } = props;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    // $FlowFixMe
    <Button size="small" variant="text" color="primary" onClick={onClick} {...restProps}>
      <FontAwesomeIcon icon={icon} fixedWidth />
    </Button>
  );
  /* eslint-enable */
};

export default IconButton;
