import Lottie from "react-lottie";
import animationData from "../assets/lottie/NotFound.json"; // Make sure you have a Lottie animation file for 404 error
import CTAButton from "../components/core/Homepage/Button";

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col gap-12 items-center select-none justify-center min-h-screen bg-richblack-900 text-richblack-50 font-mono px-4">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="w-full md:w-1/2 max-w-md mx-auto mt-8 md:mt-0">
          <Lottie options={defaultOptions} />
        </div>
        <div className="flex flex-col justify-center md:mb-8">
          <h1 className="text-8xl md:text-[10rem] lg:text-[17rem] font-bold drop-shadow-white-lg text-center">
            404
          </h1>
          <p className="text-lg md:text-2xl mt-8 text-center">
            OOPS! PAGE NOT FOUND
          </p>
        </div>
      </div>

      <CTAButton linkTo="/" active={true}>
        Go to Homepage
      </CTAButton>
    </div>
  );
};

export default NotFound;
