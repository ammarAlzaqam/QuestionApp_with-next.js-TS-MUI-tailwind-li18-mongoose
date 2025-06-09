import PasswordForm from "./passwordForm/PasswordForm";
import ProfileForm from "./profileForm/ProfileForm";
import ProfileTitle from "./Title";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-10 sm:gap-3">
      <ProfileTitle />
      <div className="flex flex-col sm:flex-row gap-15 sm:gap-10 p-5 sm:p-10">
        <ProfileForm />
        <PasswordForm />
      </div>
    </div>
  );
}
