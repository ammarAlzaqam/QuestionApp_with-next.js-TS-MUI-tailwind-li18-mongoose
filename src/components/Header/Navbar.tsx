"use client";
import i18n from "@/utils/translation/i18n";
import { Button } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  lang: "en" | "ar";
}

export default function Navbar({ lang }: HeaderProps) {
  const { t } = useTranslation();
  const toggleLang = () => {
    i18n.changeLanguage(lang === "en" ? "ar" : "en");
  };

  return (
    <nav className="flex items-center gap-2 sx:gap-5">
      <Link href={"/"}>{t("app.name")}</Link>
      <Button variant="contained" sx={{ ml: 1 }} onClick={toggleLang}>
        {t("app.lang")}
      </Button>
    </nav>
  );
}
