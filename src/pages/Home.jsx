import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import HighlightedText from "../components/core/Homepage/HighlightedText";
import CTAButton from "../components/core/Homepage/Button";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection";
import TimelineSection from "../components/core/Homepage/TimelineSection";

function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div className="w-11/12 relative mx-auto flex flex-col items-center justify-between text-white">
        <Link to="/signup">
          <div
            style={{ boxShadow: "0px -1px 0p x 0px #FFFFFF2E inset" }}
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
        <div className="md:w-10/12">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div>
                Unlock your <HighlightedText text="coding potential" />
                with our online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabutton1={{
              active: true,
              linkTo: "/login",
              text: "Try it Yourself",
            }}
            ctabutton2={{
              active: false,
              linkTo: "/signup",
              text: "Learn More",
            }}
            codeblock={`<!DOCTYPE html> 
            <html> 
            <head><title>Example</title><linkrel="stylesheet"href="styles.css"> 
            </head> 
            <body> 
            <h1><ahref="/">Header</a> 
            </h1> 
            <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a> 
            </nav>
          `}
            bgGradient={{
              /* Ellipse 2 */
              position: "absolute",
              width: "50%",
              height: "88%",
              left: 0,
              top: 0,

              /* Gradient/02 */
              background:
                "linear-gradient(123.77deg, #8A2BE2 -6.46%, #FFA500 59.04%, #F8F8FF 124.53%)",
              opacity: "0.2",
              filter: "blur(34px)",
              transform: "matrix(1, 0, -0.03, 1, 0, 0)",

              /* Inside auto layout */
              flex: "none",
              order: "0",
              flexGrow: " 0",
            }}
            codeColor={"text-yellow-100"}
          />
        </div>

        {/* Code Section 2 */}
        <div className="md:w-10/12">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div>
                Start <HighlightedText text="coding in seconds" />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabutton1={{
              active: true,
              linkTo: "/login",
              text: "Continue Lesson",
            }}
            ctabutton2={{
              active: false,
              linkTo: "/signup",
              text: "Learn More",
            }}
            codeblock={`from django.conf import settings
            from django.urls import path
            from django.http import HttpResponse
            from django.core.management import execute_from_command_line
            
            settings.configure(DEBUG=True, ROOT_URLCONF=__name__)
            urlpatterns = [path('', lambda request: HttpResponse("Hello, World!"))]
            
            if __name__ == "__main__":
                execute_from_command_line(['manage.py', 'runserver'])            
          `}
            bgGradient={{
              /* Ellipse 2 */
              position: "absolute",
              width: "50%",
              height: "88%",
              left: 0,
              top: "-12px",

              /* Gradient/05 */
              background:
                "linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)",
              opacity: "0.2",
              filter: "blur(34px)",
              transform: "matrix(1, 0, -0.03, 1, 0, 0)",

              /* Inside auto layout */
              flex: "none",
              order: 0,
              flexGrow: 0,
            }}
            codeColor={"text-richblack-10"}
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[300px]">
          <div className="w-11/12 max-w-maxContent flex items-center justify-center gap-5 mx-auto">
            <div className="flex flex-row gap-7 text-white mt-[10rem]">
              <CTAButton active={true} linkTo="/signup">
                <div className="flex gap-2 items-center">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton linkTo="/login">
                <div className="flex gap-2 items-center">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto max-w-maxContent flex flex-col gap-5 items-center justify-center">
          <div className="flex flex-col md:flex-row gap-4 justify-center my-24">
            <div className="md:w-[40%]">
              <h2 className="text-3xl font-semibold">
                Get the skills you need for a{" "}
                <HighlightedText text="job that is in demand." />
              </h2>
            </div>
            <div className="md:w-[40%]">
              <p className="text-base font-medium mb-8">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <CTAButton active={true}>Learn More</CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto max-w-maxContent flex flex-col md:flex-row gap-5 items-center justify-center">
          <TimelineSection />
          <div>
            <img src="" alt="" />
          </div>
        </div>

        <LearningLanguageSection />
      </div>

      {/* Section 3 */}
      {/* Footer */}
    </div>
  );
}

export default Home;
