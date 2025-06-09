import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="font-bold text-2xl text-center">Login Page</h1>
      <LoginForm />
    </div>
  );
}
