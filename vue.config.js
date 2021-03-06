// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  configureWebpack: {
    // plugins: [
    //   new BundleAnalyzerPlugin(),
    // ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '~',
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
  },
  productionSourceMap: false,
  // ... other configuration

  // ... other configuration
};
