import { useState } from "react";

function About({ user, userDetails, setUserDetails }) {
  const handleAboutChange = (e) => {
    setUserDetails((prev) => ({ ...prev, about: e.target.value }));
  };
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-richblack-5 text-lg font-semibold">About</h2>
        </div>
        <div className="mt-5">
          <textarea
            className={`bg-richblack-700 text-richblack-100 rounded-[0.5rem] p-[12px] shadow-richblack w-full min-h-[100px]`}
            style={{
              boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
            }}
            name="about"
            id="about"
            value={userDetails.about}
            onChange={handleAboutChange}
          >
            Write Somwthing about Yourself.
          </textarea>
        </div>
      </div>
    </div>
  );
}

export default About;
