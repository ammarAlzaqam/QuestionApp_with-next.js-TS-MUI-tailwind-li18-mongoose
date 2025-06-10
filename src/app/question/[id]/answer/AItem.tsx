import { Avatar } from "@mui/material";
import dayjs from "@/libs/dayjs";
import Vote from "../Vote";

export default function AnswerItem({ a }: { a: any }) {
  return (
    // <section className="p-2 flex flex-col gap-2">

    //
    // </section>
    <section className="flex gap-2 items-center">
      <Vote votesTotal={a?.votesTotal} postId={a._id} />
      <div className="w-full flex flex-col gap-3">
        <div
          className="text-gray-300"
          dangerouslySetInnerHTML={{ __html: a?.content }}
        />
        <AInfo a={a} />
      </div>
    </section>
  );
}

function AInfo({ a }: { a: any }) {
  return (
    <div className="flex justify-between items-center gap-3">
      <div className="flex items-center gap-2">
        <Avatar>{a?.user?.name?.charAt(0)}</Avatar>
        <p className="text-gray-100">{a?.user?.name}</p>
      </div>
      <p className="text-gray-300">{dayjs(a?.createdAt).fromNow()}</p>
    </div>
  );
}
