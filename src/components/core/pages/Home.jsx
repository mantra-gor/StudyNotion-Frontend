import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

function Home() {
  return (
    <div className="w-11/12 relative mx-auto flex flex-col items-center justify-between text-white">
      {/* Section 1 */}
      <Link to="/signup">
        <div
          style={{ boxShadow: "0px -1px 0px 0px #FFFFFF2E inset" }}
          className="mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-medium text-richblack-200 transition-all duration-200 
        hover:scale-95 w-fit group"
        >
          <div className="flex items-center gap-2 px-10 py-[5px] rounded-full group-hover:bg-richblack-900">
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>
        </div>
      </Link>

      <div className="mx-auto mt-16">
        <h1 className="text-richblack-5 text-4xl font-semibold">
          Empower Your Future with{" "}
          <span
            style={{
              background:
                "linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Coding Skills
          </span>
        </h1>
      </div>

      {/* Section 2 */}
      {/* Section 3 */}
      {/* Footer */}
    </div>
  );
}

export default Home;
