import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import options from "../../data/countrycode.json";
import Button from "../ui/Button";
import { apiConnector } from "../../services/apiConnector";
import { contactUsEndpoint } from "../../services/apiEndpoints";
import toast from "react-hot-toast";
import LinearLoader from "../ui/spinner/LinearLoader";

function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        message: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const submitContactForm = async (data) => {
    setLoading(true);
    await apiConnector("POST", contactUsEndpoint.CONTACT_US_API, data)
      .then((res) => {
        toast.success("Your request has successfully sent to the team.");
      })
      .catch((error) => {
        console.error("Failed to send mail of contact us:", error);
        toast.error(error.response.data.message);
      });
    setLoading(false);
  };

  return (
    <form
      className="text-richblack-5 mt-6 flex flex-col gap-y-5"
      onSubmit={handleSubmit(submitContactForm)}
    >
      {loading && <LinearLoader />}

      <div className="w-full flex flex-col md:flex-row gap-2 justify-center">
        <div className="md:w-6/12">
          <label className="flex flex-col gap-y-1">
            <p>
              First Name <sup className=" text-[0.725rem] text-pink-200">*</sup>
            </p>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              className={` bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
              style={{
                boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
              }}
              {...register("firstName", { required: true })}
            />
          </label>
          {errors.firstName && (
            <span className="text-pink-200 text-sm">
              First Name is required
            </span>
          )}
        </div>
        <div className="md:w-6/12">
          <label className="flex flex-col gap-y-1">
            <p>
              Last Name <sup className=" text-[0.725rem] text-pink-200">*</sup>
            </p>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              className={` bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
              style={{
                boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
              }}
              {...register("lastName", { required: true })}
            />
          </label>
          {errors.lastName && (
            <span className="text-pink-200 text-sm">Last Name is required</span>
          )}
        </div>
      </div>
      <div className=" flex gap-5 justify-center">
        <div className=" w-full">
          <label className="flex flex-col gap-y-1">
            <p>
              Email <sup className=" text-[0.725rem] text-pink-200">*</sup>
            </p>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              className={` bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
              style={{
                boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
              }}
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-pink-200 text-sm">
              Email Address is required
            </span>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center">
        <label htmlFor="phoneNo">
          Phone Number <sup className=" text-[0.725rem] text-pink-200">*</sup>
        </label>
        <div className="w-full flex justify-center gap-2 items-baseline">
          <select
            name="country_code"
            id="country_code"
            className="w-1/6 h-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 md:p-[12px] py-[12px] shadow-richblack"
            style={{
              boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
            }}
            {...register("countryCode", { required: true })}
          >
            <option defaultValue value="+91">
              +91
            </option>
            {options.map((opt, index) => (
              <option key={index} value={opt.code}>
                {opt.code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="phoneNo"
            name="phoneNo"
            placeholder="9998888777"
            className={`w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
            style={{
              boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
            }}
            {...register("phoneNo", { required: true, maxLength: 10 })}
          />
        </div>
        {(errors.phoneNo || errors.countryCode) && (
          <span className="text-pink-200 text-sm">Phone No. is required</span>
        )}
      </div>
      <div className="w-full">
        <label className="flex flex-col gap-y-1">
          <p>
            Message <sup className=" text-[0.725rem] text-pink-200">*</sup>
          </p>
          <textarea
            name="message"
            id="message"
            placeholder="Enter your message"
            rows={5}
            {...register("message", { required: true })}
            className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack w-full"
            style={{
              boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
            }}
          ></textarea>
        </label>
        {errors.message && (
          <span className="text-pink-200 text-sm">Message is required</span>
        )}
      </div>

      <div>
        <Button disabled={loading} type="submit" active={true}>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default ContactUsForm;
