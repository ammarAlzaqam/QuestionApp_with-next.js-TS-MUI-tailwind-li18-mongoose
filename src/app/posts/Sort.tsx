"use client";
import { Button, ButtonGroup, Divider } from "@mui/material";
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
  return (
    <div className="p-3 mb-3 border-cyan-900">
      <ButtonGroup sx={{mb: 2}}>
        <Button sx={{ color: "white" }} onClick={() => navigation(-1)}>
          {t("btn.newest")}
        </Button>
        <Button sx={{ color: "white" }} onClick={() => navigation(1)}>
          {t("btn.oldest")}
        </Button>
      </ButtonGroup>
      <Divider variant="fullWidth" sx={{bgcolor: "primary.dark"}} />
    </div>
  );
}
