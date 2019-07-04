// @flow
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/pro-solid-svg-icons';
import { Colors } from 'lattice-ui-kit';

const { PURPLES } = Colors;

const Index = styled.span`
  font-size: 12px;
  font-weight: bold;
`;

type Props = {
  index :number
};

const IndexCircle = ({ index } :Props) => (
  <span className="fa-layers fa-lg fa-fw">
    <FontAwesomeIcon icon={faCircle} color={PURPLES[2]} />
    <Index className="fa-layers-text fa-inverse">{index}</Index>
  </span>
);

export default IndexCircle;
