"use client";

import Tags from "@/app/posts/Tags";
import { Avatar, Divider, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import Vote from "./Vote";

export default function QuestionData({ question }: { question: any }) {
  return (
    <div className="flex flex-col gap-5">
      <QHead q={question} />
      <Divider sx={{ mb: 1 }} />
      <div className="flex gap-2 items-center">
        <Vote votesTotal={question?.votesTotal} postId={question._id} />
        <div className="w-full flex flex-col gap-3">
          <div
            dangerouslySetInnerHTML={{ __html: question?.content }}
            className="text-gray-200"
          />
          <QInfo q={question} />
        </div>
      </div>
    </div>
  );
}

function QHead({ q }: { q: any }) {
  const router = useRouter();
  const { i18n } = useTranslation();
  return (
    <div className="flex items-center gap-2">
      <IconButton>
        <ArrowBackIcon
          className="cursor-pointer"
          onClick={() => router.back()}
          sx={{ transform: i18n.language === "ar" ? "rotate(180deg)" : "" }}
        />
      </IconButton>
      <h3 className="text-2xl font-semibold">{q?.question?.title}</h3>
    </div>
  );
}

function QInfo({ q }: { q: any }) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Avatar>{q?.user?.name?.charAt(0)}</Avatar>
        <p>{q?.user?.name}</p>
      </div>
      <Tags tags={q?.tags} />
    </div>
  );
}
