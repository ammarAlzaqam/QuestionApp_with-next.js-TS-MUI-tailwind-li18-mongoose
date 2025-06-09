"use client";
import { UserDocument } from "@/models/user";
import { Avatar, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getUserData } from "@/utils/apiRequests";

interface HeaderProps {
  lang: "en" | "ar";
}

export default function Header({ lang }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //TODO>> get user data
  const [user, setUser] = useState<UserDocument | null>(null);

  useEffect(() => {
    getUserData(setUser);
  }, [pathname, searchParams]);

  return (
    <header className="py-5 px-2 sm:px-5 flex justify-between items-center border-b-2 border-cyan-800">
      <Navbar lang={lang} />
      {user ? <AuthHeader user={user} setUser={setUser} /> : <NonAuthHeader />}
    </header>
  );
}

interface AuthHeaderProps {
  user: UserDocument | null;
  setUser: React.Dispatch<React.SetStateAction<UserDocument | null>>;
}

const AuthHeader = ({ user, setUser }: AuthHeaderProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  //TODO>> log out handler
  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`
      );
      setUser(null);
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
        <Avatar><p className="text-gray-200">{user?.name[0]}</p></Avatar>
      </Link>
      <p>{user?.name}</p>
        <LogoutIcon titleAccess={t("header.logout")} sx={{cursor: "pointer"}} onClick={handleLogout}/>
    </div>
  );
};

const NonAuthHeader = () => {
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
