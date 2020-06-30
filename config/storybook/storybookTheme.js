import { create } from '@storybook/theming';
import { Colors } from 'lattice-ui-kit';

const { NEUTRALS } = Colors;

export default create({
  base: 'light',

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  // Text color
  textColor: `${NEUTRALS[0]}`
});
