/* eslint-disable @next/next/no-sync-scripts */

import { Html, Head, Main, NextScript } from "next/document";
import { FC } from "react";

export const Document: FC = () => {
  return (
    <Html>
      <Head>
        <script src="/__env.js" />
      </Head>
      <body className="overflow-y-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
