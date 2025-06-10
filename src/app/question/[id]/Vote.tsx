"use client";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { makeVote } from "@/utils/apiRequests";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { IconButton } from "@mui/material";

export default function Vote({
  votesTotal,
  postId,
}: {
  votesTotal: number;
  postId: string;
}) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  return (
    <div className="flex flex-col items-center">
      <IconButton
        className="cursor-pointer"
        disabled={Boolean(!user)}
        onClick={() => makeVote(postId, true, router)}
        color="success"
      >
        <KeyboardArrowUpIcon />
      </IconButton>

      <p>{votesTotal}</p>
      <IconButton
        className="cursor-pointer"
        color="error"
        disabled={Boolean(!user)}
        onClick={() => makeVote(postId, false, router)}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
    </div>
  );
}
