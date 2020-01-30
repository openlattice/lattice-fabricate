/*
 * @flow
 */

import React from 'react';

import styled from 'styled-components';

const DescriptionDiv = styled.div`
  grid-column: 1 / -1;
  font-size: 14px;
  font-style: italic;
  margin-bottom: 5px;
`;

type Props = {
  description :string;
  id :string;
};

const DescriptionField = ({ id, description } :Props) => {

  if (typeof description === 'string' && description.length) {
    return <DescriptionDiv id={id}>{description}</DescriptionDiv>;
  }

  return null;
};

export default DescriptionField;
