"use client";

import { Avatar, Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserStore } from "@/stores/userStore";

export const AuthHeader = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  //TODO>> log out handler
  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`
      );
      useUserStore.getState().logout();
      router.refresh();
      toast.success(res.data.message);
    } catch (e: any) {
      console.log(`Error in logout handler: ${e}`);
      toast.error(e.response?.data.message);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Link href="/profile" title={t("header.profile")}>
        <Avatar>
          <p className="text-gray-200">{user?.name[0]}</p>
        </Avatar>
      </Link>
      <p>{user?.name}</p>
      <LogoutIcon
        titleAccess={t("header.logout")}
        sx={{ cursor: "pointer" }}
        onClick={handleLogout}
      />
    </div>
  );
};

export const NonAuthHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-3">
      <Button variant="outlined" color="info">
        <Link href="/login" className="text-white">
          {t("header.login")}
        </Link>
      </Button>
    </div>
  );
};
