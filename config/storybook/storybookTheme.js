import { create } from '@storybook/theming';
import { Colors } from 'lattice-ui-kit';

const { NEUTRAL } = Colors;

export default create({
  base: 'light',

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  // Text color
  textColor: `${NEUTRAL.N900}`
});
