// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const Webpack = require('webpack');

module.exports = function({ config, mode }) {
  config.module.rules.push({
    test: /\.stories.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  });

  const ENV_DEV = 'development';
  const ENV_PROD = 'production';

  const DEFINE_PLUGIN = new Webpack.DefinePlugin({
    __ENV_DEV__: JSON.stringify(mode === 'DEVELOPMENT'),
    __ENV_PROD__: JSON.stringify(mode === 'PRODUCTION'),
    __PACKAGE__: JSON.stringify('lattice-fabricate'),
  });

  config.plugins.push(DEFINE_PLUGIN);

  return config;
};
