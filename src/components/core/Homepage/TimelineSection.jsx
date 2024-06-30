import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const timelineData = [
  {
    logo: logo1,
    heading: "Leadership",
    description: "Fully committed to the success of company",
  },
  {
    logo: logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    logo: logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

function TimelineSection() {
  return (
    <div className="md:w-[45%]">
      <div className="flex flex-col">
        {timelineData.map((item, index) => (
          <div key={index}>
            {index != 0 && (
              <div className="w-12 h-12 flex justify-center items-center">
                <div className="w-0 h-9 border border-dashed border-richblack-100" />
              </div>
            )}
            <div className="flex gap-4 relative">
              <div
                className="w-12 h-12 flex items-center justify-center bg-white rounded-full"
                style={{
                  boxShadow: "0px 0px 62px rgba(0, 0, 0, 0.12)",
                }}
              >
                <img src={item.logo} alt={item.logo} loading="lazy" />
              </div>

              <div>
                <h4 className="text-lg text-richblack-800 font-semibold">
                  {item.heading}
                </h4>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineSection;
