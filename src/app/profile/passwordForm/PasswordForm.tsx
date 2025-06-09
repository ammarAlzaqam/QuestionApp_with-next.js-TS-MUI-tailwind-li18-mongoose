"use client";

import { Button, TextField } from "@mui/material";
import useRegisterFormik from "./Formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CachedIcon from "@mui/icons-material/Cached";

type FiledType = "password" | "newPassword";

export default function PasswordForm() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const formik = useRegisterFormik(setLoading);
  const getFieldError = (type: FiledType): string =>
    formik.touched[type] && formik.errors[type] ? formik.errors[type] : "";

  return (
    <form
      className="grow flex flex-col items-start gap-5"
      onSubmit={formik.handleSubmit}
    >
      <TextField
        type="password"
        fullWidth
        name="password"
        label={t("input.current_password")}
        value={formik.values["password"]}
        error={Boolean(getFieldError("password"))}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={getFieldError("password")}
      />

      <TextField
        type="password"
        fullWidth
        name="newPassword"
        label={t("input.new_password")}
        value={formik.values["newPassword"]}
        error={Boolean(getFieldError("newPassword"))}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={getFieldError("newPassword")}
      />

      <Button type="submit" disabled={loading} variant="contained">
        {loading ? <CachedIcon className="animate-spin" /> : t("btn.change_password")}
      </Button>
    </form>
  );
}
