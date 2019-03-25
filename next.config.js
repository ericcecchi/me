const withCSS = require('@zeit/next-css');
const withPurgeCss = require('next-purgecss');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = withCSS(
  withPurgeCss({
    purgeCss: {
      whitelist: ['html', 'body'],
      extractors: [
        {
          extractor: TailwindExtractor,

          // Specify the file extensions to include when scanning for
          // class names.
          extensions: ['js']
        }
      ]
    }
  })
);
