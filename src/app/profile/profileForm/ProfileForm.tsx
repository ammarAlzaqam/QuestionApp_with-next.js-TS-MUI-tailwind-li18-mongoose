"use client";

import { Button, TextField } from "@mui/material";
import useRegisterFormik from "./Formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CachedIcon from "@mui/icons-material/Cached";
import { getUserData } from "@/utils/apiRequests";
import { UserDocument } from "@/models/user";

type FiledType = "name" | "email";

export default function ProfileForm() {
  const [user, setUser] = useState<UserDocument | null>(null);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const formik = useRegisterFormik(setLoading, user);
  const getFieldError = (type: FiledType): string =>
    formik.touched[type] && formik.errors[type] ? formik.errors[type] : "";

  useEffect(() => {
    getUserData(setUser);
  }, []);

  return (
    <form
      className="grow flex flex-col items-start gap-5"
      onSubmit={formik.handleSubmit}
    >
      <TextField
        type="text"
        fullWidth
        name="name"
        label={t("input.name")}
        value={formik.values["name"]}
        error={Boolean(getFieldError("name"))}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={getFieldError("name")}
      />

      <TextField
        type="email"
        fullWidth
        name="email"
        label={t("input.email")}
        value={formik.values["email"]}
        error={Boolean(getFieldError("email"))}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={getFieldError("email")}
      />

      <Button type="submit" disabled={loading} variant="contained">
        {loading ? <CachedIcon className="animate-spin" /> : t("btn.save")}
      </Button>
    </form>
  );
}
