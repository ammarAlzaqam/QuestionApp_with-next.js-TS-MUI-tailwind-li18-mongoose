import PasswordForm from "../passwordForm/PasswordForm";
import ProfileForm from "../profileForm/ProfileForm";
import ProfileTitle from "../Title";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-10">
      <ProfileTitle />
      <div className="flex gap-10 p-10">
        <ProfileForm />
        <PasswordForm />
      </div>
    </div>
  );
}
