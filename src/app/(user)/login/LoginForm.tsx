"use client";

import { Button, TextField } from "@mui/material";
import useLoginFormik from "./Formik";
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import CachedIcon from "@mui/icons-material/Cached";

type FiledType = "email" | "password";

export default function LoginForm() {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const formik = useLoginFormik(setLoading);
  const getFieldError = (type: FiledType): string =>
    formik.touched[type] && formik.errors[type] ? formik.errors[type] : "";

  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>

      <TextField
        type="email"
        name="email"
        label={t("input.email")}
        value={formik.values["email"]}
        error={Boolean(getFieldError("email"))}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={getFieldError("email")}
      />

      <TextField
        type="password"
        name="password"
        label={t("input.password")}
        value={formik.values["password"]}
        error={Boolean(getFieldError("password"))}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={getFieldError("password")}
      />

      <Button type="submit" disabled={loading} variant="contained">
        { loading ? <CachedIcon className="animate-spin" /> : t("btn.continue") }
      </Button>
      <Link href="/register" className="text-center text-[#5fa4ff] hover:text-[#496890] transition">{t("dontHaveAccount")}</Link>
    </form>
  );
}
