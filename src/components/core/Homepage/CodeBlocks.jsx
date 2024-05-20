import HighlightedText from "./HighlightedText";
import CTAButton from "./Button";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

function CodeBlocks({
  position,
  heading,
  highlightedText,
  subheading,
  ctabutton1,
  ctabutton2,
  bgGradient,
  codeColor,
}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      <div className="w-[50%] flex flex-col gap-8">
        <h2 className="text-richblack-5 text-4xl font-semibold">
          Unlock your <HighlightedText text={highlightedText} /> with our online
          courses.
        </h2>
        <p></p>
        <div>
          <CTAButton active={true}>Try it Yourself</CTAButton>
          <CTAButton active={false}>Learn More</CTAButton>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default CodeBlocks;
