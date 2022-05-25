import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;400&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
            crossOrigin="anonymous"
          />
          <link rel="manifest" href="/manifest.json" />

          {/* Potentially move this into _app.tsx */}
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />

          <meta name='application-name' content='Trunk' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='Trunk' />
          <meta name='description' content='A trunk for your brain' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/icons/browserconfig.xml' />
          <meta name='msapplication-TileColor' content='#5BAED9' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#5BAED9' />

          <link rel='apple-touch-icon' href='/icons/logo512.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/logo512.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/logo512.png' />
          <link rel='apple-touch-icon' sizes='167x167' href='/logo512.png' />

          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='shortcut icon' href='/favicon.ico' />

          <link rel='manifest' href='/manifest.json' />
          <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5BAED9' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />

          <meta name='twitter:card' content='A trunk for your brain' />
          <meta name='twitter:url' content='https://trunk.land' />
          <meta name='twitter:title' content='Trunk' />
          <meta name='twitter:description' content='🗃' />
          <meta name='twitter:image' content='https://trunk.land/logo192.png' />
          <meta name='twitter:creator' content='@jellypbc' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Trunk' />
          <meta property='og:description' content='A trunk for your brain' />
          <meta property='og:site_name' content='Trunk' />
          <meta property='og:url' content='https://trunk.land' />
          <meta property='og:image' content='https://trunk.land/porcorosso.gif' />

          {/*
          <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' />
          */}

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
