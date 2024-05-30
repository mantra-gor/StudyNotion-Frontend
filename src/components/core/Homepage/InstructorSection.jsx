import Instructor from "../../../assets/Images/Instructor.png";
import HighlightedText from "./HighlightedText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa6";

function InstructorSection() {
  return (
    <div className="mt-16">
      <div className="flex flex-col md:flex-row gap-20 items-center">
        <div className="md:w-[50%] flex items-center justify-center">
          <img
            src={Instructor}
            alt="Instructor Image"
            className="shadow-white w-[90%]"
            loading="lazy"
            style={{
              boxShadow: "-20px -20px 0px 0px #FFFFFF",
            }}
          />
        </div>
        <div className="md:w-[50%] flex flex-col gap-10">
          <div className="text-4xl font-semibold">
            Become an <br />
            <HighlightedText text={"Instructor"} />
          </div>
          <p className="font-medium text-[16px] md:w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <CTAButton active={true} linkTo="/signup">
            <div className="flex gap-2 items-center">
              Start Teaching Toady
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

export default InstructorSection;
