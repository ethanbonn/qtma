// import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import initAuth from "../utils/initAuth";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import  firebase from "firebase/app";
import 'firebase/analytics';

import { useRouter } from "next/router";

// import { getAnalytics } from "firebase/analytics";

const app = initAuth();
const analytics = firebase.analytics;

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   if (process.env.NODE_ENV != 'development') {
  //     analytics();
  //   }
  // }, [])
  const routers = useRouter();

  useEffect(() => {
    const logEvent = (url) => {
      analytics().setCurrentScreen(url);
      analytics().logEvent('screen_view');
    };
    logEvent("/");
    // if (process.env.NODE_ENV != "development") {
      // const logEvent = (url) => {
      //   analytics().setCurrentScreen(url);
      //   analytics().logEvent('screen_view');
      // };

      // routers.events.on('routeChangeComplete', logEvent);
      // //For First Page
      // logEvent(window.location.pathname);

      //Remvove Event Listener after un-mount
    //   return () => {
    //     routers.events.off('routeChangeComplete', logEvent);
    //   };
    // },
  }, []);
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
