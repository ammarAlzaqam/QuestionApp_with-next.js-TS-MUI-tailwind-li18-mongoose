"use client";

import React, { useState } from "react";
import TextEditor from "./Editor";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import CachedIcon from "@mui/icons-material/Cached";

export default function AddAnswer({ QId }: { QId: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const AddAnswerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return toast.error("Answer is required");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/answer`,
        { content, question: QId }
      );
      setLoading(false);
      router.refresh();
      setContent("");
      toast.success(data.message);
    } catch (e: any) {
      setLoading(false);
      toast.error(e.response?.data.message);
    }
  };

  return (
    <form
      onSubmit={AddAnswerHandler}
      className="flex flex-col items-start gap-3"
    >
      <TextEditor value={content} onChange={setContent} />
      <Button disabled={loading} type="submit" variant="contained">
        {loading ? (
          <CachedIcon className="animate-spin" />
        ) : (
          t("btn.share")
        )}
      </Button>
    </form>
  );
}
