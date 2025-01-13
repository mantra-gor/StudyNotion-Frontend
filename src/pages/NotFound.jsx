import Lottie from "react-lottie";
import animationData from "../assets/lottie/NotFound.json";
import CTAButton from "../components/core/Homepage/CTAButton";

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
    <div
      className="flex flex-col md:gap-12 items-center select-none justify-center md:min-h-screen bg-richblack-900 
    text-richblack-50 font-mono px-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-4 md:mb-0">
        <div className="w-8/12 md:w-1/2 max-w-md mx-auto mt-8 md:mt-0">
          <Lottie options={defaultOptions} />
        </div>
        <div className="w-full md:w-auto flex flex-col justify-center items-center md:mb-8">
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
