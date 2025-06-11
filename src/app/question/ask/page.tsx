import AddAskForm from "./AddAskForm";

export default async function AskPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tag`, {
    next: {revalidate: 60 * 60 * 24}
  });
  const tags = await res.json();
  return (
    <AddAskForm tags={tags} />
  )
}
