import { useDispatch, useSelector } from "react-redux";
import Button from "../../../ui/Button";
import ProfilePicture from "./ProfilePicture";
import About from "./About";
import PersonalDetails from "./PersonalDetails";
import Password from "./Password";
import AccountDeletion from "./AccountDeletion";
import { useEffect, useState } from "react";
import { updateProfile } from "../../../../services/operations/dashboardApi";
import { setUser } from "../../../../redux/slices/profileSlice";

function Settings() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

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

  const handleSaveClick = async () => {
    const response = await updateProfile(userDetails);

    // Update the redux state
    if (response.success) {
      dispatch(setUser({ ...user, additionalDetails: response.data }));
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 p-6">
      <h1 className="text-2xl font-bold text-richblack-5">Edit Profile</h1>
      <ProfilePicture user={user} />
      <div className="bg-richblack-800 border border-richblack-700 p-4 md:px-8 md:py-6 rounded-md flex flex-col gap-4">
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
      </div>

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
