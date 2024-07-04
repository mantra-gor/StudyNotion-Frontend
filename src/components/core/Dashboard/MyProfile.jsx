import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { TbEdit } from "react-icons/tb";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col gap-8 mb-8">
      <h1 className="text-3xl text-richblack-5 m-2">My Profile</h1>
      <div className=" bg-richblack-800 border border-richblack-700 px-8 py-6 rounded-md">
        <div className="flex justify-between">
          <div className="flex items-center gap-8">
            <img
              src={user?.avatar}
              alt="Avatar"
              className="w-16 rounded-full"
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
            className="flex justify-center items-center gap-2 !w-[90px] !h-[40px] !p-5"
          >
            <TbEdit size={28} />
            Edit
          </Button>
        </div>
      </div>

      <div className="bg-richblack-800 border border-richblack-700 px-8 py-6 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-richblack-5 text-lg font-semibold">About</h2>
          <Button
            active
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            className="flex justify-center items-center gap-2 !w-[90px] !h-[40px] !p-5"
          >
            <TbEdit size={28} />
            Edit
          </Button>
        </div>
        <div className="mt-5">
          <p className="text-richblack-100">
            {user.additionalDetails.about
              ? user?.additionalDetails?.about
              : "Write Somwthing about Yourself."}
          </p>
        </div>
      </div>

      <div className="bg-richblack-800 border border-richblack-700 px-8 py-6 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-richblack-5 text-lg font-semibold">
            Personal Details
          </h2>
          <Button
            active
            className="flex justify-center items-center gap-2 !w-[90px] !h-[40px] !p-5"
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
                {user?.additionalDetails?.dob}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
