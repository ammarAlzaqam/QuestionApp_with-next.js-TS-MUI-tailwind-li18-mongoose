export const dynamic = "force-dynamic";

import { getAllTags } from "@/utils/apiRequests";
import TagItem from "./TagItem";
import { TagDocument } from "@/models/tag";

export default async function TagsPage() {
  const tags = (await getAllTags()) as TagDocument[];
  return (
    <section className="flex flex-wrap flex-col sm:flex-row gap-5">
      {tags.map((tag) => (
        <TagItem key={tag._id as string} tag={tag} />
      ))}
    </section>
  );
}
