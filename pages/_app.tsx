import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import createEmotionCache from "../utils/emotionCache";
import theme from "../styles/theme";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../layout/Header";
const clientSideEmotionCache = createEmotionCache();
type ExtendedAppProps = AppProps & {
  emotionCache: typeof clientSideEmotionCache;
};

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: ExtendedAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Header />
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
