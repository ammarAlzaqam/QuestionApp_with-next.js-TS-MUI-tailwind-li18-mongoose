"use client";
import { PostDocument } from "@/models/post";
import { getPosts } from "@/utils/apiRequests";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import Posts from "./posts/Posts";
import Sort from "./posts/Sort";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClientHomePage() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostDocument[] | null>(null);
  const [pages, setPages] = useState(0);
  const searchParams = useSearchParams();
  const sort = parseInt(searchParams.get("sort") || "-1");
  const pageNumber = parseInt(searchParams.get("pageNumber") || "1");
  useEffect(() => {
    getPosts(setPosts, setPages, pageNumber, sort);
  }, [sort, pageNumber]);
  return (
    <div className="flex flex-col justify-between items-center grow gap-5">
      <div className="flex flex-col grow w-full">
        <Sort pageNumber={pageNumber} />
        <Posts posts={posts} />
      </div>

      <Pagination
        count={pages}
        variant="outlined"
        defaultPage={1}
        page={pageNumber}
        color="primary"
        onChange={(event: React.ChangeEvent<unknown>, page: number) => {
          router.push(`?pageNumber=${page}&sort=${sort}`);
        }}
      />
    </div>
  );
}
