// @flow
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/pro-solid-svg-icons';
import { Colors } from 'lattice-ui-kit';

const { PURPLES } = Colors;

const IconLayer = styled.span`
  visibility: ${props => !props.visible && 'hidden'};
  margin: 5px 0;
`;

const Index = styled.span`
  font-size: 12px;
  font-weight: bold;
`;

type Props = {
  index :number;
  visible :boolean;
};

const IndexCircle = ({ index, visible } :Props) => (
  <IconLayer className="fa-layers fa-lg fa-fw" visible={visible}>
    <FontAwesomeIcon icon={faCircle} color={PURPLES[2]} />
    <Index className="fa-layers-text fa-inverse">{index}</Index>
  </IconLayer>
);

export default IndexCircle;
