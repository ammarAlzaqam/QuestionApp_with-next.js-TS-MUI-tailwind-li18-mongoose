"use client";
import { useUserStore } from "@/stores/userStore";
import { Button, ButtonGroup, Divider } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface SortProps {
  pageNumber: number;
}

export default function Sort({ pageNumber = 1 }: SortProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const navigation = (sort: number) => {
    router.push(`?pageNumber=${pageNumber}&sort=${sort}`);
  };
  const user = useUserStore((state) => state.user);
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-5">
        <ButtonGroup>
          <Button sx={{ color: "white" }} onClick={() => navigation(-1)}>
            {t("btn.newest")}
          </Button>
          <Button sx={{ color: "white" }} onClick={() => navigation(1)}>
            {t("btn.oldest")}
          </Button>
        </ButtonGroup>
        <Link href="/tag" passHref>
          <Button color="warning">{t("title.tags")}</Button>
        </Link>
        {user && (
          <Link href="/question/ask" passHref>
            <Button variant="contained">{t("btn.ask")}</Button>
          </Link>
        )}
      </div>
      <Divider variant="fullWidth" sx={{ bgcolor: "primary.dark" }} />
    </div>
  );
}
