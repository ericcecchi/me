import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
          <script
            async
            src="https://analytics.ericcecchi.com/tracker.js"
            data-ackee-server="https://analytics.ericcecchi.com"
            data-ackee-domain-id="5345d057-3ae1-4d23-8989-4bcef5a2df15"
          />
        </body>
      </Html>
    );
  }
}
