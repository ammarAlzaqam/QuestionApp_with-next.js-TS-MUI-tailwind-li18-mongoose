import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { UserDocument } from "@/models/user";
import { useRouter } from "next/navigation";
export default function useProfileFormik(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const router = useRouter();
  return useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(100, "Password must be less than 100 characters")
        .required("Password is required"),

      newPassword: Yup.string()
        .min(6, "New Password must be at least 6 characters")
        .max(100, "New Password must be less than 100 characters")
        .required("New Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/password`,
          values
        );
        setLoading(false);
        toast.success(res.data.message);
      } catch (e: any) {
        console.error(`Error in RegisterFrom: ${e}`);
        toast.error(e.response?.data.message);
        setLoading(false);
      }
    },
  });
}
