"use client";
import { PostDocument } from "@/models/post";
import { getPosts } from "@/utils/apiRequests";
import { useEffect, useState } from "react";
import PostItem from "./posts/PostItem";
import { Divider, Pagination } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ClientHomePage() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostDocument[] | null>(null);
  const [pages, setPages] = useState(0);
  useEffect(() => {
    getPosts(setPosts, setPages, 1);
  }, []);
  return (
    <div className="flex flex-col justify-between items-center grow">
      <div className="flex flex-col gap-5 w-full">
        {posts?.map((post) => (
          <div key={post._id as string}>
            <PostItem post={post} />
            <Divider sx={{ mt: 2 }} />
          </div>
        ))}
      </div>
      <Pagination
        count={pages}
        defaultPage={1}
        onChange={(event: React.ChangeEvent<unknown>, page: number) => {
          getPosts(setPosts, setPages, page);
        }}
      />
    </div>
  );
}
