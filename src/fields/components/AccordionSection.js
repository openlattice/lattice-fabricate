// @flow
import { useState } from 'react';
import type { Node } from 'react';

import styled from 'styled-components';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CardSegment,
  // $FlowFixMe
  Collapse,
  IconButton,
  Typography,
} from 'lattice-ui-kit';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex: 0 1 auto;
  align-items: center;
`;

const ToggleIcon = styled(FontAwesomeIcon)`
  transform: ${(props) => (props.open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export type props = {
  children :Node;
  title :string;
};

const AccordionSection = ({
  children,
  title,
} :props) => {
  const [isOpen, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <CardSegment padding="20px 0 0">
      <HeaderWrapper onClick={toggleOpen}>
        <LabelWrapper>
          <Typography variant="subtitle2">{title}</Typography>
        </LabelWrapper>
        <IconButton variant="text" size="small">
          <ToggleIcon
              fixedWidth
              icon={faChevronDown}
              onClick={toggleOpen}
              open={isOpen} />
        </IconButton>
      </HeaderWrapper>
      <Collapse in={isOpen}>
        {children}
      </Collapse>
    </CardSegment>
  );
};

export default AccordionSection;
