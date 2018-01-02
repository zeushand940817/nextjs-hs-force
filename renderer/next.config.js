module.exports = {
  webpack (config, { dev }) {
    config.target = 'electron-renderer'
    config.node = {
      __dirname: true
    }
    // Hide the "dependency is a critical expression" warnings
    // There's no need to care about them
    config.module.exprContextCritical = false

    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== 'UglifyJsPlugin'
    })

    // Make `react-dom/server` work
    if (config.resolve.alias) {
      delete config.resolve.alias.react
      delete config.resolve.alias['react-dom']
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
