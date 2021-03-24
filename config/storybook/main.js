module.exports = {
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-storysource',
  ],
  core: {
    builder: 'webpack5',
  },
  stories: ['../../src/**/*.stories.js'],
};
