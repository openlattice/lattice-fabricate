import React from 'react';
import styled from 'styled-components';
import { configure, addDecorator, addParameters } from '@storybook/react';

import storybookTheme from './storybookTheme';
import { Colors } from 'lattice-ui-kit';

const { NEUTRALS } = Colors;

const StoryWrapper = styled.div`
  color: ${NEUTRALS[0]};
  font-family: 'Open Sans', Arial, sans-serif;
  font-stretch: normal;
  font-style: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-height: 1.5;
  background-color: ${NEUTRALS[7]};
  height: 100%;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  overflow: scroll;
`;

const AppContentWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  position: relative;
  justify-content: center;
`;

const AppContentInnerWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: center;
  max-width: 1020px;
  width: 100%;
  margin: 30px;
`;

addDecorator(storyFn => (
  <StoryWrapper>
    <AppContentWrapper>
      <AppContentInnerWrapper>
        {storyFn()}
      </AppContentInnerWrapper>
    </AppContentWrapper>
  </StoryWrapper>
));

addParameters({
  options: {
    theme: storybookTheme
  },
});
// automatically import all files ending in *.stories.js
const req = require.context('../../src/', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
