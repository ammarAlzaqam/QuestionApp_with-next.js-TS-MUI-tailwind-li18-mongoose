"use client";
import "./globals.css";
import "@/utils/translation/i18n";
import { useTranslation } from "react-i18next";

import { useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/utils/emotionCache";
import getAppTheme from "@/theme";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  //TODO>> language sitting
  const { i18n } = useTranslation();

  const lang = i18n.language as "en" | "ar";
  const direction = lang === "ar" ? "rtl" : "ltr";

  const emotionCache = useMemo(
    () => createEmotionCache(direction),
    [direction]
  );

  const theme = useMemo(() => getAppTheme(direction), [direction]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = direction;
  }, [lang, direction]);

  //! check rendering...
  const [langReady, setLangReady] = useState(false);
  useEffect(() => {
    setLangReady(true);
  }, []);
  if (!langReady)
    return (
      <html lang="en">
        <body></body>
      </html>
    );

  return (
    <html lang={lang} dir={direction}>
      <body
        className={`flex flex-col min-h-screen ${
          direction === "rtl" ? "rtl" : ""
        }`}
      >
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header lang={lang} />

            <main className="container bg-black mx-auto p-5 flex flex-col grow">
              {children}
              <ToastContainer position="top-center" theme="dark" />
            </main>

            <Footer />
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
