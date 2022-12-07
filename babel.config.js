module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          esmodules: true,
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [require('@babel/plugin-proposal-decorators'), { decoratorsBeforeExport: true }],
    ['@babel/plugin-proposal-class-properties'],
    ['module-resolver'],
  ],
};

