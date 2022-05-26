// module.exports = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   }
// }

// building tauri, maybe disable the disable line, or run in node_env 'production'

const withPWA = require('next-pwa')

module.exports = withPWA({
  eslint: {
    ignoreDuringBuilds: true,
  },
  pwa: {
    dest: './src/public',
    disable: process.env.NODE_ENV !== 'production'
  }
})