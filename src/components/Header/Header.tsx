"use client";
import { UserDocument } from "@/models/user";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getUserData } from "@/utils/apiRequests";
import { AuthHeader, NonAuthHeader } from "./UserData";
import { useUserStore } from "@/stores/userStore";

interface HeaderProps {
  lang: "en" | "ar";
}

export default function Header({ lang }: HeaderProps) {

  //TODO>> get user data
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <header className="py-5 px-2 sm:px-5 flex justify-between items-center border-b-2 border-cyan-800">
      <Navbar lang={lang} />
      {user ? <AuthHeader /> : <NonAuthHeader />}
    </header>
  );
}
