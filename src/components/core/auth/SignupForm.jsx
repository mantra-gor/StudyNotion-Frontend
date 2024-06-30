import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../../services/operations/authApi";
import { setSignupData } from "../../../redux/slices/authSlice";

function SignupForm() {
  const [activeRole, setActiveRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(setSignupData(formData));
    dispatch(sendOtp(formData.email, navigate));
  }

  function roleChangeHandler(event) {
    setActiveRole(event.target.innerText);
  }

  return (
    <div>
      <div className=" my-6 flex justify-between p-1 text-richblack-5 bg-richblack-800 rounded-full w-[50%] shadow-richblack">
        <button
          onClick={roleChangeHandler}
          className={`${
            activeRole === "Student"
              ? "bg-richblack-900 text-white"
              : "bg-richblack-800 text-richblack-200"
          } px-5 py-2 rounded-full transition duration-200`}
        >
          Student
        </button>
        <button
          onClick={roleChangeHandler}
          className={`${
            activeRole === "Instructor"
              ? "bg-richblack-900 text-white"
              : "bg-richblack-800 text-richblack-200"
          } px-5 py-2 rounded-full transition duration-200`}
        >
          Instructor
        </button>
      </div>

      <form className="grid grid-cols-2 gap-4" onSubmit={submitHandler}>
        <div>
          <label htmlFor="firstname">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name <sup className=" text-[0.725rem] text-pink-200">*</sup>
            </p>
          </label>
          <Input
            type="text"
            required
            name="firstname"
            id="firstname"
            placeholder="Enter First Name"
            onChange={changeHandler}
            value={formData.firstname}
          />
        </div>

        <div>
          <label htmlFor="lastname">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name <sup className=" text-[0.725rem] text-pink-200">*</sup>
            </p>
          </label>
          <Input
            type="text"
            required
            name="lastname"
            id="lastname"
            placeholder="Enter Last Name"
            onChange={changeHandler}
            value={formData.lastname}
          />
        </div>

        <div className=" col-span-2">
          <label htmlFor="email">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Email Address{" "}
              <sup className=" text-[0.725rem] text-pink-200">*</sup>
            </p>
          </label>
          <Input
            type="email"
            required
            name="email"
            id="email"
            placeholder="Enter Email Address"
            onChange={changeHandler}
            value={formData.email}
            className="w-full"
          />
        </div>
        <div className=" col-span-2">
          <label htmlFor="phone">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Phone Number
              <sup className=" text-[0.725rem] text-pink-200">*</sup>
            </p>
          </label>
          <Input
            type="tel"
            required
            name="phone"
            id="phone"
            placeholder="Enter Email Address"
            onChange={changeHandler}
            value={formData.phone}
            className="w-full"
          />
        </div>

        <div className=" relative">
          <label htmlFor="createPassword">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Create Password{" "}
              <sup className=" text-[0.725rem] text-pink-200">*</sup>
            </p>
          </label>
          <Input
            type={showPassword ? "text" : "password"}
            required
            name="password"
            id="createPassword"
            placeholder="Enter Password"
            onChange={changeHandler}
            value={formData.password}
          />
          <span
            className=" absolute cursor-pointer text-richblack-5 right-3 top-[38px] text-2xl"
            onClick={() => setShowPassword((prevValue) => !prevValue)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fill="#afb2bf" />
            ) : (
              <AiOutlineEye fill="#afb2bf" />
            )}
          </span>
        </div>

        <div className="relative">
          <label htmlFor="confirmPassword">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm Password{" "}
              <sup className=" text-[0.725rem] text-pink-200">*</sup>
            </p>
          </label>
          <div>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              required
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={changeHandler}
              value={formData.confirmPassword}
            />
            <span
              className=" absolute cursor-pointer text-richblack-5 right-3 top-[38px] text-2xl"
              onClick={() => setShowConfirmPassword((prevValue) => !prevValue)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fill="#afb2bf" />
              ) : (
                <AiOutlineEye fill="#afb2bf" />
              )}
            </span>
          </div>
        </div>

        <button
          style={{
            boxShadow: "-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset",
          }}
          className="col-span-2 bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-4 active:bg-yellow-25 
        transition-all duration-200"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
