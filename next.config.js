const withTM = require('next-transpile-modules')(['lodash-es']);
module.exports = withTM({
  // Target must be serverless
  target: 'experimental-serverless-trace',
});
