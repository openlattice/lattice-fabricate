module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
    'babel-plugin-styled-components',
    ['babel-plugin-transform-imports', {
      '@fortawesome/free-solid-svg-icons': {
        transform: (importName) => `@fortawesome/free-solid-svg-icons/${importName}`,
        preventFullImport: true,
        skipDefaultConversion: true
      },
    }]
  ],
  presets: [
    ['@babel/preset-react', {
      runtime: 'automatic'
    }],
    '@babel/preset-flow',
    '@babel/preset-react',
  ],
};
