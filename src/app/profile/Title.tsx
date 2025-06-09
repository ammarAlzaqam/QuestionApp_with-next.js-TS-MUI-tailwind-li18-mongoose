"use client"

import { useTranslation } from "react-i18next";

export default function ProfileTitle() {
  const {t} = useTranslation();
  return <h1 className="font-bold text-2xl ps-10 py-5 bg-black shadow-inner-2 shadow-cyan-950 shadow-lg border-b-2">{t("title.profile")}</h1>;
}
