import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
export default function useLoginFormik(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const router = useRouter();
  return useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        // name@example.domain1.domain
        .email("Invalid email address"),

      password: Yup.string()
        .max(100, "Password must be less than 100 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
          values
        );
        router.replace("/");
        useUserStore.getState().setUser(data.user);
        toast.success(data.message);
        resetForm();
        setLoading(false);
      } catch (e: any) {
        console.error(`Error in LoginFrom: ${e}`);
        toast.error(e.response?.data.message);
        setLoading(false);
      }
    },
  });
}
