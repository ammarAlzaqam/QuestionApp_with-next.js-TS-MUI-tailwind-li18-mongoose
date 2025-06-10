import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
export default function useProfileFormik(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  return useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),

      email: Yup.string()
        .required("Email is required")
        // name@example.domain1.domain
        .email("Invalid email address"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { data } = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`,
          values
        );
        setLoading(false);
        useUserStore.getState().setUser(data.user);
        toast.success(data.message);
      } catch (e: any) {
        console.error(`Error in RegisterFrom: ${e}`);
        toast.error(e.response?.data.message);
        setLoading(false);
      }
    },
  });
}
