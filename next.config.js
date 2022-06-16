// const withPWA = require('next-pwa')

// // when building tauri, maybe disable the disable line, or run in node_env 'production'

// module.exports = withPWA({
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   pwa: {
//     dest: './src/public',
//     disable: process.env.NODE_ENV !== 'production'
//   }
// })

module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
