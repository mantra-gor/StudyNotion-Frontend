import HighlightedText from "../components/core/Homepage/HighlightedText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Quote from "../components/core/About/Quote";
import Card from "../components/core/About/Card";
import CTAButton from "../components/core/Homepage/CTAButton";
import Footer from "../components/common/Footer";
import ContactFormSection from "../components/core/About/ContactFormSection";

function AboutUs() {
  return (
    <div>
      {/* Section 1 */}
      <section className="bg-richblack-800 relative">
        <div className="w-11/12 relative mx-auto flex flex-col items-center justify-between">
          <header>
            <h1 className="text-richblack-5 text-4xl font-semibold mx-auto md:text-center mt-10 md:w-6/12">
              Driving Innovation in Online Education for a{" "}
              <HighlightedText text="Brighter Future" />{" "}
            </h1>
            <p className="mx-auto mt-6 md:w-8/12 text-richblack-300 text-lg md:text-center">
              Studynotion is at the forefront of driving innovation in online
              education. We&apos; re passionate about creating a brighter future
              by offering cutting-edge courses, leveraging emerging
              technologies, and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="flex flex-col justify-between items-center mt-12">
            <div className="md:h-[150px]" />
            <div className="flex flex-col md:flex-row mx-auto justify-center items-center gap-6 md:absolute">
              <img
                src={BannerImage1}
                alt="About Us Banner Image1"
                loading="lazy"
                className="md:w-1/3"
              />
              <img
                src={BannerImage2}
                alt="About Us Banner Image2"
                loading="lazy"
                className="md:w-1/3"
              />
              <img
                src={BannerImage3}
                alt="About Us Banner Image3"
                loading="lazy"
                className="md:w-1/3"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="lg:h-[250px]" />

      {/* Section 2 */}
      <section className="w-10/12 mx-auto my-10">
        <Quote />
      </section>

      {/* Section 3 */}
      <section className="w-11/12 relative mx-auto flex flex-col items-center justify-between mt-20">
        <div className="lg:h-[130px]" />
        <div className="md:w-10/12 flex flex-col md:flex-row gap-6 md:mx-auto justify-between items-center">
          <div className="md:w-6/12">
            <h2
              className="text-4xl font-semibold"
              style={{
                background:
                  "linear-gradient(117.95deg, #833AB4 -2.4%, #FD1D1D 52.25%, #FCB045 106.89%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Founding Story
            </h2>
            <p className="text-richblack-300 text-base mt-6">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className="text-richblack-300 text-base mt-2">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          <div className="md:w-6/12 flex flex-col items-end">
            <img
              src={FoundingStory}
              alt="Founding Story"
              className="lg:w-[760px]"
            />
          </div>
        </div>

        <div className="h-[130px]" />

        <div className="md:w-10/12 flex flex-col md:flex-row gap-6 mx-auto justify-between items-center">
          <div className="md:w-6/12">
            <h2
              className="text-4xl font-semibold"
              style={{
                background:
                  "linear-gradient(118.41deg, #E65C00 -6.05%, #F9D423 106.11%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Vision
            </h2>
            <p className="text-richblack-300 text-base mt-6">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
          <div className="md:w-6/12">
            <h2
              className="text-4xl font-semibold"
              style={{
                background:
                  "linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Mission
            </h2>
            <p className="text-richblack-300 text-base mt-6">
              our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="bg-richblack-800 flex justify-center items-center text-center py-14 mt-20">
        <div className="w-10/12 mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10 place-items-center">
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-bold text-3xl text-richblack-5">5K</h3>
            <h4 className="font-semibold text-base text-richblack-500">
              Active Students
            </h4>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-bold text-3xl text-richblack-5">10+</h3>
            <h4 className="font-semibold text-base text-richblack-500">
              Mentors
            </h4>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-bold text-3xl text-richblack-5">200+</h3>
            <h4 className="font-semibold text-base text-richblack-500">
              Courses
            </h4>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-bold text-3xl text-richblack-5">50+</h3>
            <h4 className="font-semibold text-base text-richblack-500">
              Awards
            </h4>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="flex flex-col my-12">
        <div className="w-10/12 mx-auto flex flex-col md:flex-row justify-between">
          <div className="md:w-5/12 h-[100%] flex flex-col justify-between">
            <div>
              <h2 className="text-richblack-5 text-4xl font-semibold">
                World-Class Learning for{" "}
                <HighlightedText text="Anyone, Anywhere" />
              </h2>
              <p className="text-richblack-300 font-medium mt-4">
                Studynotion partners with more than 275+ leading universities
                and companies to bring flexible, affordable, job-relevant online
                learning to individuals and organizations worldwide.
              </p>
            </div>
            <div className="mt-12 mb-10 md:mb-0">
              <CTAButton linkTo="/signup" active={true}>
                Learn More
              </CTAButton>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mx-auto md:m-0 gap-4 md:gap-0">
            <Card
              title="Curriculum Based on Industry Needs"
              text="Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
            />
            <Card
              title="Our Learning Methods"
              text="The learning process uses the namely online and offline."
              light={false}
            />
          </div>
        </div>
        <div className="w-10/12 mx-auto flex flex-col md:flex-row justify-end">
          <div className="flex flex-col md:flex-row mx-auto md:m-0 gap-4 md:gap-0">
            {/* <Card title="" text="" /> */}
            <Card
              title="Certification"
              text="Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
            />
            <Card
              title="Rating Auto-grading"
              text="You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
              light={false}
            />
            <Card
              title="Ready toWork"
              text="Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.."
            />
          </div>
        </div>
      </section>

      {/* Section 6 */}
      <section className="w-11/12 relative mx-auto flex flex-col items-center justify-between my-24">
        <ContactFormSection />
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default AboutUs;
