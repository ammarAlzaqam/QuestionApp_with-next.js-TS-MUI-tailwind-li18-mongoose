import { Button } from "@mui/material";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="font-bold text-2xl text-center">Register Page</h1>
      <RegisterForm />
    </div>
  );
}
