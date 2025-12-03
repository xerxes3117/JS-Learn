module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          'styles': './src/styles',
          'components': './src/components',
          'schemas': './src/schemas',
        },
        root: ['./src'],
      },
    ],
  ],
};
