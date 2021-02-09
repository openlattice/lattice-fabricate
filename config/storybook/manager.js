import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import { Colors } from 'lattice-ui-kit';

const { NEUTRAL } = Colors;

const theme = create({
  base: 'light',

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  // Text color
  textColor: `${NEUTRAL.N900}`
});

addons.setConfig({
  theme
});
