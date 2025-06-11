"use client";

import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface FormValues {
  title: string;
  qTags: string[]; // ← أهم جزء
  content: string;
}

export default function useAddTaskFormik(
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  const router = useRouter();
  return useFormik<FormValues>({
    initialValues: {
      title: "",
      qTags: [],
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      qTags: Yup.array()
        .min(1, "Please select at least one tag")
        .required("Tags are required"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async ({ title, content, qTags: tags }, { resetForm }) => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/question`,
          {
            title,
            content,
            tags,
          }
        );
        setLoading(false);
        router.replace("/");
        toast.success(data.message);
        resetForm();
      } catch (e: any) {
        setLoading(false);
        toast.error(e.response.data.message);
      }
    },
  });
}
