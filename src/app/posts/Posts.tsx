import { Divider } from "@mui/material";
import PostItem from "./PostItem";

export default function Posts({ posts }: { posts: any }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {posts?.map((post: any) => (
        <div key={post._id as string}>
          <PostItem post={post} />
          <Divider variant="inset" sx={{ mt: 2 }} />
        </div>
      ))}
    </div>
  );
}
