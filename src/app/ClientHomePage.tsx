"use client"
import { useTranslation } from "react-i18next";

export default function ClientHomePage() {
  const { t } = useTranslation();
    return (
      <div>
        <p>{t("welcomes")}</p>
      </div>
    );
}
