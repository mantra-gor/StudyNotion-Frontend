import { useDispatch } from "react-redux";
import Button from "../../../ui/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePassword } from "../../../../services/operations/authApi";
import InputForm from "../../../ui/form/InputForm";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Password() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const [passwordVisible, setPasswordVisible] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleVisiblity = (name) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const changePassword = (data) => {
    dispatch(updatePassword(data));
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(changePassword)}>
        <div className="bg-richblack-800 border border-richblack-700 p-4 md:px-8 md:py-6 srounded-md">
          <div className="flex justify-between items-center">
            <h2 className="text-richblack-5 text-lg font-semibold">
              Change Password
            </h2>
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-between items-center">
            <div className="mt-5 grid grid-cols-1 gap-8 w-full md:w-6/12">
              <div className="relative">
                <label>
                  <p className="text-sm text-richblack-600 font-normal">
                    Old Password{" "}
                    <sup className=" text-[0.725rem] text-pink-200">*</sup>
                  </p>

                  <InputForm
                    type={passwordVisible.oldPassword ? "text" : "password"}
                    className="text-sm text-richblack-5 font-medium !bg-richblack-700 w-full"
                    required={true}
                    placeholder="********"
                    name="oldPassword"
                    id="oldPassword"
                    register={register}
                  />
                  <span
                    className="absolute cursor-pointer text-richblack-5 right-4 top-1/2 text-2xl"
                    onClick={() => handleVisiblity("oldPassword")}
                  >
                    {passwordVisible.oldPassword ? (
                      <AiOutlineEyeInvisible fill="#afb2bf" />
                    ) : (
                      <AiOutlineEye fill="#afb2bf" />
                    )}
                  </span>
                </label>
              </div>

              <div className="relative">
                <label>
                  <p className="text-sm text-richblack-600 font-normal">
                    New Password{" "}
                    <sup className=" text-[0.725rem] text-pink-200">*</sup>
                  </p>

                  <InputForm
                    type={passwordVisible.newPassword ? "text" : "password"}
                    className="text-sm text-richblack-5 font-medium !bg-richblack-700 w-full"
                    required={true}
                    placeholder="********"
                    name="newPassword"
                    id="newPassword"
                    register={register}
                  />
                  <span
                    className="absolute cursor-pointer text-richblack-5 right-4 top-1/2 text-2xl"
                    onClick={() => handleVisiblity("newPassword")}
                  >
                    {passwordVisible.newPassword ? (
                      <AiOutlineEyeInvisible fill="#afb2bf" />
                    ) : (
                      <AiOutlineEye fill="#afb2bf" />
                    )}
                  </span>
                </label>
              </div>

              <div className="relative">
                <label>
                  <p className="text-sm text-richblack-600 font-normal">
                    Confirm Password{" "}
                    <sup className=" text-[0.725rem] text-pink-200">*</sup>
                  </p>

                  <InputForm
                    type={passwordVisible.confirmPassword ? "text" : "password"}
                    className="text-sm text-richblack-5 font-medium !bg-richblack-700 w-full"
                    required={true}
                    placeholder="********"
                    name="confirmPassword"
                    id="confirmPassword"
                    register={register}
                  />
                  <span
                    className="absolute cursor-pointer text-richblack-5 right-4 top-1/2 text-2xl"
                    onClick={() => handleVisiblity("confirmPassword")}
                  >
                    {passwordVisible.confirmPassword ? (
                      <AiOutlineEyeInvisible fill="#afb2bf" />
                    ) : (
                      <AiOutlineEye fill="#afb2bf" />
                    )}
                  </span>
                </label>
              </div>
            </div>
            <div className="w-full md:w-6/12 mt-4 md:px-10">
              <h3 className="text-base md:text-lg font-semibold text-richblack-50">
                New Password Requirements:
              </h3>
              <ul className="mt-8 text-richblack-100">
                <li className="mb-5">
                  <span className="font-semibold">Length:</span> Minimum of 8
                  characters.
                </li>
                <li>
                  <span className="font-semibold">Complexity:</span> Must
                  include at least one uppercase letter, one lowercase letter,
                  one number, and one special character (e.g., !, @, #, $).
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <div>
            <Button type="submit" active={true}>
              Update Password
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Password;
