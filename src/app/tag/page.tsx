"use client";

import { getAllTags } from "@/utils/apiRequests";
import TagItem from "./TagItem";
import { TagDocument } from "@/models/tag";
import { useEffect, useState } from "react";

export default function TagsPage() {
  const [tags, setTags] = useState<TagDocument[] | null>(null);
  useEffect(() => {
    getAllTags(setTags);
  }, []);
  return (
    <section className="flex flex-wrap flex-col sm:flex-row gap-5">
      {tags?.map((tag) => (
        <TagItem key={tag._id as string} tag={tag} />
      ))}
    </section>
  );
}
