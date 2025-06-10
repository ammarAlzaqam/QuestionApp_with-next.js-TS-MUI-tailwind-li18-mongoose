"use client";
import { useTranslation } from "react-i18next";
import dayjs from "@/libs/dayjs";
import "dayjs/locale/ar";
import { PostDocument } from "@/models/post";
import Tags from "./Tags";
import Link from "next/link";

interface PostItemProps {
  post: PostDocument;
}

export default function PostItem({ post }: any) {
  const { i18n } = useTranslation();
  return (
    <div key={post._id as string} className="flex justify-between p-2 gap-2">
      <div className="flex items-start gap-7">
        <div className="px-3 py-1 bg-cyan-700 rounded-sm text-xl">
          {post?.question?.answersCount || "0"}
        </div>
        <div className="flex flex-col gap-2">
          <Link
            href={`/question/${post._id}`}
            className="text-gray-200 hover:text-white line-clamp-3"
          >
            {post?.question?.title}
          </Link>
          <Tags tags={post?.tags} />
        </div>
      </div>

      <div className="text-gray-300">{dayjs(post?.createdAt).fromNow()}</div>
    </div>
  );
}
