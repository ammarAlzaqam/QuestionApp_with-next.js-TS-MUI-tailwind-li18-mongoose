"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer () {
  const { t } = useTranslation();
  return (
    <footer className="flex justify-center items-center p-5 border-t-2 border-gray-800 bg-black">
      <p className="text-gray-400">
        {t("copyright")} {" "}
        <Link href="/">{t("app.name")}</Link>
      </p>
    </footer>
  );
}
