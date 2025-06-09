"use client";
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs'
import { PostDocument } from "@/models/post";

interface PostItemProps {
  post: PostDocument;
}

export default function PostItem({ post }: any) {
  const { i18n } = useTranslation();
  return (
    <div key={post._id as string} className="flex justify-between p-2">
      <div className="flex items-start gap-7">
        <div className="px-3 py-1 bg-cyan-500 rounded-md text-xl">
          {post?.question?.answersCount || "0"}
        </div>
        <div>
          <p className="mb-3">{post?.question?.title}</p>
          <div className="flex gap-1">
            {post?.tags?.map((tag: any) => (
              <div
                className="px-3 py-1 ms-1 rounded-full bg-green-800"
                key={tag._id as string}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-gray-300" >{dayjs(post?.createdAt).locale(i18n.language).format("DD/MM/YY")}</div>
    </div>
  );
}
