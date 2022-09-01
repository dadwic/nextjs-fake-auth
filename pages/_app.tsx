import React from "react";
import Head from "next/head";
import NProgress from "nprogress";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "utils/createEmotionCache";
import LoadingOverlay from "components/LoadingOverlay";
import Redirect from "components/Redirect";
import { useStore } from "hooks/store";
import { theme } from "utils";
import "assets/nprogress.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  React.useEffect(() => {
    const handleStart = (_url: string) => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingOverlay />} persistor={persistor}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <SnackbarProvider preventDuplicate maxSnack={1}>
              <Redirect>
                <Component {...pageProps} />
              </Redirect>
            </SnackbarProvider>
          </ThemeProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
}
