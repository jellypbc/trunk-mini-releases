// module.exports = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   }
// }

const withPWA = require('next-pwa')

module.exports = withPWA({
  eslint: {
    ignoreDuringBuilds: true,
  },
  pwa: {
    dest: './src/public'
  }
})