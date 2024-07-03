import { useSelector } from "react-redux";

function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-full h-full">
      <img src={user.avatar} alt="avatar" className="w-7 rounded-full" />
    </div>
  );
}

export default ProfileDropdown;
