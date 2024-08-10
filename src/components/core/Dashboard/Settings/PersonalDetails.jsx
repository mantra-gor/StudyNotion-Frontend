import React, { useState, useEffect } from "react";
import Input from "../../../ui/Input";

function PersonalDetails({ user, userDetails, setUserDetails }) {
  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="bg-richblack-800 border border-richblack-700 px-8 py-6 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-richblack-5 text-lg font-semibold">
            Personal Details
          </h2>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm text-richblack-600 font-normal">
                First Name
              </p>
              <Input
                disabled={true}
                onChange={handleUserDetailsChange}
                name="firstName"
                className="text-sm text-richblack-5 font-medium !bg-richblack-700 w-full"
                value={user.firstName}
              />
            </div>
            <div>
              <p className="text-sm text-richblack-600 font-normal">Email</p>
              <Input
                disabled={true}
                onChange={handleUserDetailsChange}
                name="email"
                className="text-sm text-richblack-5 font-medium w-full !bg-richblack-700"
                value={user.email}
              />
            </div>
            <div>
              <p className="text-sm text-richblack-600 font-normal">Gender</p>
              <div
                className="flex gap-4 bg-richblack-700 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack"
                style={{
                  boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
                }}
              >
                {["Male", "Female", "Other"].map((genderOption) => (
                  <label
                    key={genderOption}
                    className="text-richblack-300 font-normal flex items-center gap-2"
                  >
                    {genderOption}
                    <input
                      type="radio"
                      name="gender"
                      value={genderOption}
                      onChange={handleUserDetailsChange}
                      checked={userDetails.gender === genderOption}
                      className="w-5 h-5"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm text-richblack-600 font-normal">
                Last Name
              </p>
              <Input
                disabled={true}
                onChange={handleUserDetailsChange}
                name="lastName"
                className="text-sm text-richblack-5 font-medium !bg-richblack-700 w-full"
                value={user.lastName}
              />
            </div>
            <div>
              <p className="text-sm text-richblack-600 font-normal">
                Phone Number
              </p>
              <Input
                onChange={handleUserDetailsChange}
                name="phoneNo"
                className="text-sm text-richblack-5 font-medium !bg-richblack-700 w-full"
                value={userDetails.phoneNo}
              />
            </div>
            <div>
              <p className="text-sm text-richblack-600 font-normal">
                Date Of Birth
              </p>
              <Input
                onChange={handleUserDetailsChange}
                name="dob"
                className="text-sm text-richblack-5 font-medium !bg-richblack-700 w-full"
                type="date"
                value={userDetails.dob}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
