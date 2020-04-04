
const appConfig = require('./src/app.config')

/** @type import('@vue/cli-service').ProjectOptions */
module.exports = {
  devServer: {
    host: 'app.tolbert.test',
    open: 'Google Chrome',
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  // https://github.com/neutrinojs/webpack-chain/tree/v4#getting-started
  chainWebpack (config) {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', appConfig.title)

    // Don't allow importing .vue files without the extension, as
    // it's necessary for some Vetur autocompletions.
    // config.resolve.extensions.delete('.vue')

    // Only enable performance hints for production builds,
    // outside of tests.
    config.performance.hints(
      process.env.NODE_ENV === 'production' &&
        !process.env.VUE_APP_TEST &&
        'warning',
    )
  },
  // Configure Webpack's dev server.
  // https://cli.vuejs.org/guide/cli-service.html
  // devServer: {
  //   ...(process.env.API_BASE_URL
  //     ? // Proxy API endpoints to the production base URL.
  //       { proxy: { '/api': { target: process.env.API_BASE_URL } } }
  //     : // Proxy API endpoints a local mock API.
  //       { before: require('./tests/mock-api') }),
  // },
  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },
}
