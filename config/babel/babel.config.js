module.exports = {
  plugins: [
    ['@babel/plugin-transform-runtime', {
      corejs: 3,
    }],
    ['babel-plugin-transform-imports', {
      '@fortawesome/free-solid-svg-icons': {
        transform: (importName) => `@fortawesome/free-solid-svg-icons/${importName}`,
        preventFullImport: true,
        skipDefaultConversion: true,
      },
    }],
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-styled-components',
  ],
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: false,
    }],
    ['@babel/preset-react', {
      runtime: 'automatic'
    }],
    '@babel/preset-flow',
  ],
};
