"use client";

import { useTranslation } from "react-i18next";
import AnswerItem from "./AItem";
import { Divider } from "@mui/material";

export default function Answers({ answers }: { answers: any[] }) {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col gap-5 mt-5">
      <h2 className="text-2xl font-semibold">{t("post.answers")}</h2>
      <Divider />
      <div>
        {answers.map((a) => (
          <div key={a._id} className="flex flex-col gap-5">
            <AnswerItem a={a} />
            <Divider variant="inset" />
          </div>
        ))}
      </div>
    </section>
  );
}
