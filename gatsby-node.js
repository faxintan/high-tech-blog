const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.posix.join(__dirname, './src'),
        '@utils': path.posix.join(__dirname, './src/utils'),
        '@context': path.posix.join(__dirname, './src/context'),
        '@components': path.posix.join(__dirname, './src/components'),
      },
    },
  });
};
