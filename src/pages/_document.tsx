import * as React from 'react';
// next
import Document, {Html, Head, Main, NextScript} from 'next/document';
// emotion
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';

// ----------------------------------------------------------------------

function createEmotionCache() {
  return createCache({key: 'css'});
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
          />
          <link
            href="https://use.fontawesome.com/releases/v5.0.10/css/all.css"
            rel="stylesheet"
          />

          <meta
            name="description"
            content="바운스코드 CMS를 이용하면 쉽고 빠르게 서비스를 개발할 수 있습니다."
          />
          <meta
            name="keywords"
            content="CMS,워드프레스,라이믹스,그누보드,익스프레스엔진"
          />
          <meta name="author" content="(주)바운스코드" />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              var $buoop = {required:{e:-4,f:-3,o:-3,s:-1,c:-3},insecure:true,unsupported:true,api:2020.04 }; 
              function $buo_f(){ 
              var e = document.createElement("script"); 
              e.src = "//browser-update.org/update.min.js"; 
              document.body.appendChild(e);
              };
              try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
              catch(e){window.attachEvent("onload", $buo_f)}
            `,
            }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const {extractCriticalToChunks} = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => (
        <CacheProvider value={cache}>
          <App {...props} />
        </CacheProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: style.css}}
    />
  ));

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
