const withTM = require('next-transpile-modules')(['lodash-es']);

module.exports = withTM({
  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  },
});
