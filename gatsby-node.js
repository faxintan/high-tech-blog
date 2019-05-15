const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.posix.join(__dirname, './src'),
        '@utils': path.posix.join(__dirname, './src/utils'),
        '@assets': path.posix.join(__dirname, './src/assets'),
        '@modules': path.posix.join(__dirname, './src/modules'),
        '@context': path.posix.join(__dirname, './src/context'),
        '@components': path.posix.join(__dirname, './src/components'),
      },
    },
  });
};
