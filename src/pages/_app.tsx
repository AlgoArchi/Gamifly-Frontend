import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import getConfig from "next/config";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ToastContainer } from "react-toastify";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { getI18nSSRProps, GetI18nStaticProps } from "@/utils/i18n";
import theme from "@/theme";
import "@/styles/global.scss";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import Web3ReactManager from "../../Web3ReactManager";
import { getStore, setStore } from "@/utils/storage";
import { setTrackInfo } from "@/apis/login";
import useSWR from "swr";
import globalStore from "@/stores/global";

const { publicRuntimeConfig } = getConfig();
const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

function App({ Component, pageProps }: AppProps) {
  const { userInfo } = globalStore();
  const [duration, setDuration] = useState(0);
  const { data: setTrackInfoData } = useSWR(
    userInfo && userInfo?.id && duration ? [setTrackInfo.key, duration] : null,
    (_) =>
      setTrackInfo.fetcher({ user_id: userInfo?.id, game_id: 0, duration }),
    { revalidateOnFocus: false }
  );
  useEffect(() => {
    window.gamiflyConfig = publicRuntimeConfig;
    window.imgUrl = {
      gameUrl: "https://app.gamifly.co/gamifly_server/server/assets/games/",
      imageUrl: "https://app.gamifly.co/gamifly_server/server/assets/avatars/",
    };

    const listener = (_e: any) => {
      const res = new Date().getTime() - getStore("time");
      setDuration(res);
      // e.preventDefault();
      // e.returnValue = "Are you sure you want to leave the current page?";
    };
    window.addEventListener("beforeunload", listener);
    return () => {
      window.removeEventListener("beforeunload", listener);
    };
  }, []);

  useEffect(() => {
    if (setTrackInfoData) {
      setDuration(0);
      setStore("time", new Date().getTime());
    }
  }, [setTrackInfoData]);

  return (
    <>
      <Head>
        <title>Gamifly</title>
        <meta charSet="utf-8" />
        <meta
          name="App-Config"
          content="fullscreen=yes,useHistoryState=yes,transition=yes"
        />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="yes" name="apple-touch-fullscreen" />
        <meta content="telephone=no,email=no" name="format-detection" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
        <meta
          name="facebook-domain-verification"
          content="h5t0j29jwjvh861khyncarok6kekgb"
        />
        <link
          rel="shortcut icon"
          href={`${publicRuntimeConfig.cdn}/favicon.ico`}
          type="image/x-icon"
        />
        <link
          href={`${publicRuntimeConfig.cdn}/images/apple-touch-icon-144-precomposed.png`}
          rel="apple-touch-icon-precomposed"
        />
        <script
          src={`https://www.googletagmanager.com/gtag/js?id=G-WE2SG9C70X`}
        />
        {/* <noscript>
          <img
            alt=""
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=714475236288366&ev=PageView&noscript=1"
          />
        </noscript> */}
        {/* Google Tag Manager  */}
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NRV5GV9');
          `}
        </script>
        {/* End Google Tag Manager  */}
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WE2SG9C70X', {
            page_path: window.location.pathname,
            });
          `}
        </script>
        {/* <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
             fbq('init', '714475236288366'); 
            fbq('track', 'PageView');
          `}
        </script> */}
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ReactManager>
            <Layout>
              {/* Google Tag Manager (noscript)  */}
              <noscript>
                <iframe
                  title="googleTag"
                  src="https://www.googletagmanager.com/ns.html?id=GTM-NRV5GV9"
                  height="0"
                  width="0"
                  // style="display:none;visibility:hidden"
                  style={{ display: "none", visibility: "hidden" }}
                ></iframe>
              </noscript>
              {/* End Google Tag Manager (noscript)  */}
              {/* @ts-ignore */}
              <Component {...(pageProps ?? {})} />
            </Layout>
          </Web3ReactManager>
        </Web3ReactProvider>
        <ToastContainer />
      </ChakraProvider>
    </>
  );
}

export const getStaticProps = async (context: GetI18nStaticProps) => {
  return {
    props: {
      ...(await getI18nSSRProps(context, [])),
    },
  };
};

// 这里要注意，切换语言会导致整体 APP 组件卸载再初始化
export default appWithTranslation(App);
