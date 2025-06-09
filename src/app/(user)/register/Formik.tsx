import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function useRegisterFormik(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const router = useRouter();
  return useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),

      email: Yup.string()
        .required("Email is required")
        // name@example.domain1.domain
        .email("Invalid email address"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must be less than 100 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
          values
        );
        router.replace("/");
        toast.success(res.data.message);
        resetForm();
        setLoading(false);
      } catch (e: any) {
        console.error(`Error in RegisterFrom: ${e}`);
        toast.error(e.response?.data.message);
        setLoading(false);
      }
    },
  });
}
