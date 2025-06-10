"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React from "react";
import { useTranslation } from "react-i18next";

export default function TextEditor(
  {
  value = "",
  onChange,
}: {
  value: string;
  onChange: (data: string) => void;
}  
) {

  const { i18n } = useTranslation();
  return (
    <div
      className="w-full editor-wrapper"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <CKEditor
        key={i18n.language}
        editor={ClassicEditor as any}
        data={value}
        config={{
          language: {
            ui: i18n.language,
            content: i18n.language,
          },
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
