// import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import HighlightedText from "../Homepage/HighlightedText";

function Quote() {
  return (
    <div className="text-4xl font-semibold text-richblack-100 md:text-center relative">
      We are passionate about revolutionizing the way we learn. Our innovative
      platform
      <HighlightedText text="combines technology" />,
      <span
        style={{
          background:
            "linear-gradient(117.83deg, #FF512F -4.8%, #F09819 107.46%)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {" "}
        expertise
      </span>
      , and community to create an
      <span
        style={{
          background:
            "linear-gradient(118.41deg, #E65C00 -6.05%, #F9D423 106.11%)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {" "}
        unparalleled educational experience.
      </span>
    </div>
  );
}

export default Quote;
