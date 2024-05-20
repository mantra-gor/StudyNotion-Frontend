import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import HighlightedText from "../components/core/Homepage/HighlightedText";
import CTAButton from "../components/core/Homepage/Button";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";

function Home() {
  return (
    <div className="w-11/12 relative mx-auto flex flex-col items-center justify-between text-white">
      {/* Section 1 */}
      <Link to="/signup">
        <div
          style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }}
          className="mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-medium text-richblack-200 transition-all duration-200 
        active:scale-95 w-fit group"
        >
          <div className="flex items-center gap-2 px-10 py-[5px] rounded-full group-hover:bg-richblack-900">
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>
        </div>
      </Link>

      <div className="mx-auto mt-16">
        <h1 className="text-richblack-5 text-4xl font-semibold">
          Empower Your Future with <HighlightedText text="Coding Skills" />
        </h1>
      </div>

      <div className="mx-auto mt-6 md:w-8/12 text-richblack-300 text-lg md:text-center">
        With our online coding courses, you can learn at your own pace, from
        anywhere in the world, and get access to a wealth of resources,
        including hands-on projects, quizzes, and personalized feedback from
        instructors.
      </div>

      <div className="flex flex-grow gap-7 mt-8">
        <CTAButton active={true} linkTo="/signup">
          Learn More
        </CTAButton>
        <CTAButton active={false} linkTo="/login">
          Book Demo
        </CTAButton>
      </div>

      <div
        className="md:w-9/12 my-14 shadow-blue-200 shadow-inner"
        style={{
          filter: "drop-shadow(16px 16px #FAFBFF)",
        }}
      >
        <video muted autoPlay loop>
          <source src={banner} type="video/mp4" />
        </video>
      </div>

      {/* Code Section 1 */}
      <div className="w-10/12">
        <CodeBlocks />
      </div>

      {/* Section 2 */}
      {/* Section 3 */}
      {/* Footer */}
    </div>
  );
}

export default Home;
