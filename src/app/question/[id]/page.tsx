import { Divider } from "@mui/material";
import { getSinglePost } from "@/utils/apiRequests";
import Answers from "./answer/Answers";
import AddAnswer from "./answer/AddAnswer/AddAnswer";
import QuestionData from "./QData";
import { cookies } from "next/headers";

interface QuestionProps {
  params: Promise<{ id: string }>;
}

export default async function Question({ params }: QuestionProps) {
  const { id } = await params;
  let question = await getSinglePost(id);
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  });
  const user = await res.json();
  console.log(user);
  return (
    <div className="flex flex-col gap-5">
      <QuestionData question={question} />
      <Divider variant="middle" />
      <Answers answers={question.answers} />
      {user?._id && <AddAnswer QId={question._id} />}
    </div>
  );
}
