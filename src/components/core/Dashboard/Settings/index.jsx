import { useSelector } from "react-redux";
import Button from "../../../ui/Button";
// import { TbEdit } from "react-icons/tb";
import ProfilePicture from "./ProfilePicture";
import About from "./About";
import PersonalDetails from "./PersonalDetails";
import Password from "./Password";
import AccountDeletion from "./AccountDeletion";
import { useEffect, useState } from "react";

function Settings() {
  const { user } = useSelector((state) => state.profile);
  // Use useEffect to set the initial state when user prop changes
  const [userDetails, setUserDetails] = useState({
    about: user?.additionalDetails?.about,
    phoneNo: user?.additionalDetails?.phoneNo || "",
    gender: user?.additionalDetails?.gender,
    dob: user?.additionalDetails?.dob || "",
  });

  useEffect(() => {
    setUserDetails({
      phoneNo: user?.additionalDetails?.phoneNo || "",
      gender: user?.additionalDetails?.gender || "",
      dob: user?.additionalDetails?.dob || "",
    });
  }, [user]);

  const handleSaveClick = () => {
    console.log(userDetails);
  };

  return (
    <div className="w-full flex flex-col gap-8 mb-8">
      <h1 className="text-3xl text-richblack-5 m-2">Edit Profile</h1>
      <ProfilePicture user={user} />
      <About
        user={user}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
      <PersonalDetails
        user={user}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
      <div className="flex justify-end gap-4">
        <div>
          <Button className="text-richblue-5">Cancel</Button>
        </div>
        <div>
          <Button onClick={handleSaveClick} active={true}>
            Save
          </Button>
        </div>
      </div>
      <Password />
      <AccountDeletion />
    </div>
  );
}

export default Settings;
