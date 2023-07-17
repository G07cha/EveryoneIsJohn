module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'i18next-extract',
      {
        locales: ['en', 'nl'],
        compatibilityJSON: 'v4',
        outputPath: 'src/translations/{{locale}}/{{ns}}.json',
      },
    ],
  ],
};
