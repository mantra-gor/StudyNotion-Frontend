/* eslint-disable react/prop-types */

import CTAButton from "./Button";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";

function CodeBlocks({
  position,
  heading,
  subheading,
  ctabutton1,
  ctabutton2,
  codeblock,
  bgGradient,
  codeColor,
}) {
  return (
    <div
      className={`flex flex-col md:flex-row ${position} my-20 justify-between gap-10`}
    >
      {/* Section 1 */}
      <div className="md:w-[50%] flex flex-col gap-8">
        <h2 className="text-richblack-5 text-4xl font-semibold">{heading}</h2>
        <p className="text-richblack-300">{subheading}</p>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabutton1.active} linkTo={ctabutton1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabutton1.text}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabutton2.active} linkTo={ctabutton2.linkto}>
            <div className="flex gap-2 items-center">{ctabutton2.text}</div>
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="md:w-[50%] h-fit relative">
        <div
          className="flex gap-2 items-start p-2 max-w-[830px] self-stretch"
          style={{
            backdropFilter: "blur(26px)",
            background:
              "linear-gradient(111.93deg, rgba(14, 26, 45, 0.24) -1.4%, rgba(17, 30, 50, 0.38) 104.96%)",
          }}
        >
          <div
            className="opacity-10 z-10 absolute w-full h-full rounded-full"
            style={bgGradient}
          />
          <div className="text-center flex flex-col w-[10%] text-richblack-400 font-bold ">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          </div>
          <div
            className={`w-[90%] flex flex-col gap-2 font-mono ${codeColor} relative`}
          >
            <TypeAnimation
              sequence={[codeblock, 7000, ""]}
              repeat={Infinity}
              fixed
              omitDeletionAnimation
              style={{
                whiteSpace: "pre-line",
                display: "block",
                maxWidth: "90vw",
                overflow: "hidden",
                position: "absolute",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeBlocks;
