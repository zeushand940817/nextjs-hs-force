module.exports = {
  webpack (config, { dev }) {
    config.target = 'electron-renderer'
    config.node = {
      __dirname: true
    }
    return config
  },
  exportPathMap () {
    // Let Next.js know where to find the entry page
    // when it's exporting the static bundle for the use
    // in the production version of your app
    return {
      '/index': { page: '/index' }
    }
  }
}
