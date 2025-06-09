"use client";
import { Paper } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface UserLayoutProps {
  readonly children: ReactNode;
}

export default function UserLout({ children }: UserLayoutProps) {
  const { t } = useTranslation();
  return (
    <div className="container max-w-[600px] mx-auto grow flex justify-center items-center">
      <Paper sx={{ p: 3, width: "100%" }} elevation={5}>
        {children}
        <div className="mt-10">
          <p className="text-center text-gray-400">
            {t("copyright")} <Link href="/">{t("app.name")}</Link>
          </p>
        </div>
      </Paper>
    </div>
  );
}
