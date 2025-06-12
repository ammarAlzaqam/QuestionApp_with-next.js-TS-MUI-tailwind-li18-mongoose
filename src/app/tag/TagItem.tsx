import { TagDocument } from "@/models/tag";
import Link from "next/link";

export default function TagItem({ tag }: { tag: TagDocument }) {
  return (
    <Link
      href={`/tag/${tag.slug}`}
      className="flex flex-col border lg:w-1/4 grow gap-2 p-5 min-h-[200px] hover:bg-gray-800 transition"
    >
      <h3 className="text-cyan-300">{tag.name}</h3>
      <p className="max-w-11/12 text-gray-300">{tag.description}</p>
    </Link>
  );
}
