"use client";
import "./globals.css";
import "@/utils/translation/i18n";
import { useTranslation } from "react-i18next";

import { useEffect, useMemo, useState } from "react";
import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/utils/emotionCache";
import getAppTheme from "@/theme";

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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

  const toggleLang = () => {
    i18n.changeLanguage(lang === "en" ? "ar" : "en");
  };

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
            <header>
              <nav className="p-4 flex justify-center items-center">
                <Button variant="contained" sx={{ ml: 1 }} onClick={toggleLang}>
                  {lang === "en" ? "العربية" : "English"}
                </Button>
              </nav>
            </header>

            <main className="container mx-auto p-5 grow">{children}</main>

            <footer>footer</footer>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
