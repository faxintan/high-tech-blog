// let language = null;

// exports.createPages = ({ graphql }) => {
//   return new Promise((resolve, reject) => {
//     resolve(graphql`
//       {
//         site {
//           siteMetadata {
//             language {
//               debug
//               whitelist
//               fallbackLng
//               defaultNS
//               fallbackNS
//             }
//           }
//         }
//       }
//     `).then(result => {
//       console.log('-------------', result);
//       if (result.error) reject(result.error);
//       language = result.data.site.siteMetadata.language;
//     });
//   });
// };

// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage, deletePage } = actions;
//   deletePage(page);
//   ['en', 'cn'].forEach(lng => {
//     createPage({
//       ...Object.assign({}, page, { path: `/${lng + page.path}` }),
//       context: {
//         ...page.context,
//         language,
//       },
//     });
//   });
// };
