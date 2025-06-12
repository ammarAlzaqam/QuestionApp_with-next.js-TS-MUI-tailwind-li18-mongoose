import Tag from "@/models/tag";
import connectDB from "@/utils/connectDB";
import { notFound } from "next/navigation";
import ShowPosts from "./ShowPosts";

interface ShowPostsWithTagProps {
  params: Promise<{ slug: string }>;
}

export default async function ShowPostsWithTag({
  params,
}: ShowPostsWithTagProps) {
  const { slug } = await params;
  await connectDB();
  const tag = await Tag.findOne({ slug });
  if (!tag) notFound();
  return <ShowPosts tag={tag._id?.toString() || ""} />;
}
