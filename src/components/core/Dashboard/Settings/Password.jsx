import Input from "../../../ui/Input";

function Password({ user }) {
  return (
    <div>
      <div className="bg-richblack-800 border border-richblack-700 px-8 py-6 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-richblack-5 text-lg font-semibold">Password</h2>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm text-richblack-600 font-normal">Password</p>
              <Input
                className="text-sm text-richblack-5 font-medium !bg-richblack-700 w-full"
                placeholder="********"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm text-richblack-600 font-normal">
                Confirm Password
              </p>
              <Input
                className="text-sm text-richblack-5 font-medium !bg-richblack-700 w-full"
                placeholder="********"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;
