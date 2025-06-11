"use client";

import { TagDocument } from "@/models/tag";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import useAddTaskFormik from "./Formik";
import TextEditor from "../[id]/answer/AddAnswer/Editor";
import { useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";

type FieldType = "title" | "qTags" | "content";

export default function AddAskForm({ tags }: { tags: TagDocument[] }) {
  const [loading, setLoading] = useState(false);
  const formik = useAddTaskFormik(setLoading);
  const { t } = useTranslation();
  const getFieldError = (fieldType: FieldType) => {
    return formik.touched[fieldType] && formik.errors[fieldType]
      ? formik.errors[fieldType]
      : "";
  };
  return (
    <div>
      <h3 className="">{t("title.ask")}</h3>
      <Divider sx={{ mt: 1, mb: 3, bgcolor: "#6facda" }} />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-5 items-start"
      >
        <TextField
          name="title"
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label={t("input.title")}
          error={Boolean(getFieldError("title"))}
          helperText={getFieldError("title")}
        />
        <Autocomplete
          fullWidth
          multiple
          options={tags}
          getOptionLabel={(option) => option.name}
          value={tags.filter((tag) => formik.values.qTags.includes(tag._id as string))}
          disableCloseOnSelect
          onChange={(_, newValue) => {
            formik.setFieldValue(
              "qTags",
              newValue.map((tag) => tag._id)
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name="qTags"
              onBlur={() => formik.setFieldTouched("qTags", true)}
              variant="outlined"
              label={t("input.tags")}
              error={!!(formik.touched.qTags && formik.errors.qTags)}
              helperText={formik.touched.qTags && formik.errors.qTags}
            />
          )}
        />

        <div className="w-full">
          <TextEditor
            value={formik.values.content}
            onChange={(data) => formik.setFieldValue("content", data)}
            onBlur={() => formik.setFieldTouched("content", true)}
          />
          {formik.touched.content && formik.errors.content && (
            <p className="text-red-500 text-sm ms-4 mt-1">
              {formik.errors.content}
            </p>
          )}
        </div>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? (
            <CachedIcon className="animate-spin" />
          ) : (
            t("btn.continue")
          )}
        </Button>
      </form>
    </div>
  );
}
