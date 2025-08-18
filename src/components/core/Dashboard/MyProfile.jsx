import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { TbEdit } from "react-icons/tb";
import moment from "moment";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col gap-8 p-6">
      <h1 className="text-2xl font-bold text-richblack-5">My Profile</h1>
      <div className="bg-richblack-800 border border-richblack-700 p-4 md:px-8 md:py-6 rounded-md">
        <div className="md:hidden">
          <div className="flex justify-between">
            <img
              src={user?.avatar}
              alt="Avatar"
              className="w-12 md:w-16 rounded-full"
            />
            <Button
              active
              onClick={() => {
                navigate("/dashboard/settings");
              }}
              className="flex justify-center items-center gap-2 !w-[65px] !h-[38px] !p-2"
            >
              <TbEdit size={28} />
              Edit
            </Button>
          </div>
          <div className="mt-3">
            <p className="text-richblack-5 text-lg font-semibold">
              {user.firstName + " " + user.lastName}
            </p>
            <p className="text-richblack-100">{user.email}</p>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex justify-between">
            <div className="flex items-center gap-4 md:gap-8">
              <img
                src={user?.avatar}
                alt="Avatar"
                className="w-12 md:w-16 rounded-full"
              />
              <div>
                <p className="text-richblack-5 text-lg font-semibold">
                  {user.firstName + " " + user.lastName}
                </p>
                <p className="text-richblack-100">{user.email}</p>
              </div>
            </div>
            <Button
              active
              onClick={() => {
                navigate("/dashboard/settings");
              }}
              className="flex justify-center items-center gap-2 !w-[65px] !h-[38px] !p-2"
            >
              <TbEdit size={28} />
              Edit
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-richblack-800 border border-richblack-700 p-4 md:px-8 md:py-6 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-richblack-5 text-lg font-semibold">About</h2>
          <Button
            active
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            className="flex justify-center items-center gap-2 !w-[65px] !h-[38px] !p-2"
          >
            <TbEdit size={28} />
            Edit
          </Button>
        </div>
        <div className="mt-5">
          <div className="text-richblack-100">
            {user.additionalDetails.about ? (
              <p>{user?.additionalDetails?.about}</p>
            ) : (
              <p className="italic">Write something about yourself.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-richblack-800 border border-richblack-700 p-4 md:px-8 md:py-6 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-richblack-5 text-lg font-semibold">
            Personal Details
          </h2>
          <Button
            active
            className="flex justify-center items-center gap-2 !w-[65px] !h-[38px] !p-2"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <TbEdit size={28} />
            Edit
          </Button>
        </div>
        <div className="mt-5 grid grid-cols-2">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm text-richblack-600 font-normal">
                First Name
              </p>
              <p className="text-sm text-richblack-5 font-medium">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="text-sm text-richblack-600 font-normal">Email</p>
              <p className="text-sm text-richblack-5 font-medium">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-richblack-600 font-normal">Gender</p>
              <p className="text-sm text-richblack-5 font-medium">
                {user?.additionalDetails?.gender
                  ? user?.additionalDetails?.gender
                  : "Not Provided"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm text-richblack-600 font-normal">
                Last Name
              </p>
              <p className="text-sm text-richblack-5 font-medium">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-richblack-600 font-normal">
                Phone Number
              </p>
              <p className="text-sm text-richblack-5 font-medium">
                {user?.additionalDetails?.phoneNo}
              </p>
            </div>
            <div>
              <p className="text-sm text-richblack-600 font-normal">
                Date Of Birth
              </p>
              <p className="text-sm text-richblack-5 font-medium">
                {user.additionalDetails.dob
                  ? moment(user.additionalDetails.dob).format("DD-MMM-YYYY")
                  : "Not Provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
