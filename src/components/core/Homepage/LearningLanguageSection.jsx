import HighlightedText from "./HighlightedText";
import CTAButton from "../Homepage/CTAButton";
import KnowYourProgress from "../../../assets/Images/Know_your_progress.svg";
import CompareWithOthers from "../../../assets/Images/Compare_with_others.svg";
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.svg";

function LearningLanguageSection() {
  return (
    <div className="w-11/12 mx-auto max-w-maxContent flex flex-col gap-5 items-center justify-center mt-20 py-12">
      <div className="md:w-7/12 flex flex-col">
        <h2 className="text-3xl font-semibold md:text-center">
          Your swiss knife for{" "}
          <HighlightedText text={"learning any language"} />{" "}
        </h2>
        <p className="md:text-center my-4 md:px-4">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </p>
      </div>
      <div className="flex flex-col flex-wrap md:flex-row items-center justify-center mt-5">
        <img
          src={KnowYourProgress}
          className="object-contain md:-mr-32"
          alt="Know Your Progress"
          loading="lazy"
        />
        <img
          src={CompareWithOthers}
          className="object-contain -mt-28 md:mt-0"
          alt="Compare With Others"
          loading="lazy"
        />
        <img
          src={PlanYourLessons}
          className="object-contain -mt-32 md:mt-0 md:-ml-36"
          alt="Plan Your Lessons"
          loading="lazy"
        />
      </div>
      <CTAButton active={true} linkTo="/signup">
        Learn More
      </CTAButton>
    </div>
  );
}

export default LearningLanguageSection;
