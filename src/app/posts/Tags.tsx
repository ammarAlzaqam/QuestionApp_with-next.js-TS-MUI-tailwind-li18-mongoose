import { Chip } from "@mui/material";
import Link from "next/link";

export default function Tags({ tags }: { tags: any }) {
  return (
    <div className="flex gap-2">
      {tags?.map((tag: any) => (
        <Link key={tag._id as string} href={`/tag/${tag.slug}`} passHref>
          <Chip label={tag.name} sx={{ bgcolor: "primary.dark" }} />
        </Link>
      ))}
    </div>
  );
}
