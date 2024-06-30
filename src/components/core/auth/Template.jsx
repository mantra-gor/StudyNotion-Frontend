import frameImg from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { FcGoogle } from "react-icons/fc";

function Template({ title, desc1, desc2, image, formtype }) {
  return (
    <div className=" w-11/12 max-w-[1160px] justify-between mx-auto py-12 flex flex-col-reverse gap-x-12 md:flex-row">
      <div className="w-11/12 max-w-[450px] mt-6 mx-auto md:mx-0 md:mt-0">
        <h1 className=" text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          {title}
        </h1>
        <div className="text-[1.125rem] leading-[1.625rem] mt-4">
          <span className="text-richblack-100">{desc1}</span>
          <br />
          <span className="font-edu-sa font-semibold text-blue-100 italic">
            {desc2}
          </span>
        </div>

        {formtype === "signup" ? <SignupForm /> : <LoginForm />}

        <div className=" flex w-full items-center my-4 gap-x-2">
          <div className="h-[1px] w-full bg-richblack-700" />
          <p className=" text-richblack-700 font-medium leading-[1.375rem]">
            OR
          </p>
          <div className="h-[1px] w-full bg-richblack-700" />
        </div>

        <button
          className="w-full flex gap-3 items-center justify-center rounded-[8px] 
        font-medium text-richblack-100 border border-richblack-700 px-[12px] py-[8px]"
        >
          <FcGoogle className=" text-xl" />
          <p>Sign In with Google</p>
        </button>
      </div>

      <div className="flex flex-col justify-center relative w-11/12 max-w-[450px] mx-auto md:mx-0">
        <img
          className="absolute top-[50%] translate-y-[-64%] right-4 z-10"
          src={image}
          width={558}
          alt=""
          height={504}
          loading="lazy"
        />
        <img
          src={frameImg}
          width={558}
          alt=""
          height={504}
          loading="lazy"
          className=" translate-y-[-10%] z-0"
        />
      </div>
    </div>
  );
}

export default Template;
