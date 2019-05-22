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

// Application Config
module.exports = {
  siteMetadata: {
    language,
    title: 'Hi-Tech Blog',
    description: 'An Awesome Blog',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
