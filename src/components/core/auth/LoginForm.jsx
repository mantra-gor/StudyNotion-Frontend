import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function changehandler(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    toast.success("Logged In");
    navigate("/dashboard");
  }

  return (
    <form
      className=" grid grid-cols-1 w-full gap-4 mt-6"
      onSubmit={submitHandler}
    >
      <div className="flex flex-col">
        <label className="w-full" htmlFor="email">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address{" "}
            <sup className=" text-[0.725rem] text-pink-200">*</sup>
          </p>
        </label>
        <input
          type="email"
          required
          name="email"
          id="email"
          value={formData.email}
          placeholder="Enter Email Address"
          onChange={changehandler}
          className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-richblack"
        />
      </div>

      <div className="flex flex-col relative">
        <label className="w-full" htmlFor="password">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Password <sup className=" text-[0.725rem] text-pink-200">*</sup>
          </p>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          required
          name="password"
          id="password"
          value={formData.password}
          placeholder="Enter Password"
          onChange={changehandler}
          className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-richblack"
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

      <Link
        className=" select-none text-blue-100 text-xs italic text-right -mt-2"
        to="/forgot-password"
      >
        Forget Password
      </Link>

      <button className=" bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-4">
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
