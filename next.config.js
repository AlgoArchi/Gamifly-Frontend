const withImages = require('next-images')

const { i18n } = require('./next-i18next.config')
const { client: clientConfig } = require('./config')

const version = process.env.APP_VERSION || clientConfig.version

module.exports = withImages({
  // distDir: "dist",

  experimental: {
    eslint: true,
  },

  i18n,

  images: {
    disableStaticImages: true,
  },

  assetPrefix: clientConfig.cdn,

  publicRuntimeConfig: {
    ...clientConfig,
    version,
  },

  generateBuildId: async () => {
    return `v${version.replace('.', '_')}__${Date.now()}`
  },

  // webpack(config, options) {
  //   return config
  // },
})
