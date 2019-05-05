// i18next Translation Config
const language = {
  debug: process.env.NODE_ENV === 'development', // logs issues info to console
  // lng: 'en', // assigned language to use
  whitelist: ['en', 'cn'], // all languages supported
  fallbackLng: 'en', // default language
  // ns: 'translation', // assigned namespace to use
  defaultNS: 'translation', // default namespace
  fallbackNS: ['translation'], // travels these if assigned and default namespace not found
};

// Material UI Theme Config
const theme = {
  primaryColor: '#9c27b0',
  // paletter: {
  //   // type: 'dark',
  //   primary: {
  //     // light: palette.primary[300],
  //     main: colors.dark,
  //     // dark: palette.primary[700],
  //     // contrastText: getContrastText(palette.primary[500]),
  //   },
  //   secondary: {
  //     main: colors.grey,
  //   },
  //   error: {
  //     main: colors.red,
  //   },
  // },
};

// Application Config
module.exports = {
  siteMetadata: {
    theme,
    language,
    title: 'My i18next Gatsby',
    description: 'just for learning project',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'locale',
        path: `${__dirname}/locale`,
      },
    },
    {
      resolve: 'gatsby-plugin-i18next',
      options: {
        debug: language.debug,
        fallbackLng: language.fallbackLng,
        availableLngs: language.whitelist,
      },
    },
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {},
    },
  ],
};
