import React from 'react';

import styled from 'styled-components';
import { addDecorator } from '@storybook/react';
import {
  Colors,
  LatticeLuxonUtils,
  MuiPickersUtilsProvider,
  StylesProvider,
  ThemeProvider,
  lightTheme,
} from 'lattice-ui-kit';

import storybookTheme from './manager';

const { NEUTRAL } = Colors;

const StoryOuterWrapper = styled.div`
  background-color: 'white';
  color: ${NEUTRAL.N900};
  display: flex;
  font-family: 'Inter', Arial, sans-serif;
  font-stretch: normal;
  font-style: normal;
  font-weight: normal;
  height: 100vh;
  justify-content: center;
  letter-spacing: normal;
  line-height: 1.5;
  overflow: scroll;
  position: relative;
  width: 100%;
  -webkit-font-smoothing: antialiased;
`;

const StoryInnerWrapper = styled.div`
  max-width: 1200px;
  padding: 30px;
  position: relative;
  width: 100%;
`;

addDecorator((StoryFn) => (
  <StoryOuterWrapper>
    <StoryInnerWrapper>
      <ThemeProvider theme={lightTheme}>
        <MuiPickersUtilsProvider utils={LatticeLuxonUtils}>
          <StylesProvider injectFirst>
            <StoryFn />
          </StylesProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StoryInnerWrapper>
  </StoryOuterWrapper>
));
