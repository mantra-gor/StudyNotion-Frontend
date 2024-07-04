import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { TbEdit } from "react-icons/tb";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <h1 className="text-3xl text-richblack-5 m-4 mb-9">My Profile</h1>

      <div className="mx-auto w-9/12 bg-richblack-800 border border-richblack-700 px-8 py-6 rounded-md">
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
            className="flex justify-center items-center gap-2 !w-[90px] !h-[40px] !p-5"
          >
            <TbEdit size={28} />
            Edit
          </Button>
        </div>
      </div>

      <div className="mx-auto w-9/12 bg-richblack-800 border border-richblack-700 px-8 py-6 rounded-md">
        <div className="flex justify-between">
          About
          <Button
            active
            className="flex justify-center items-center gap-2 !w-[90px] !h-[40px] !p-5"
          >
            <TbEdit size={28} />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
