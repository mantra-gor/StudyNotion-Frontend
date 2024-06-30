import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightedText from "./HighlightedText";
import CourseCard from "./CourseCard";

const tabs = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0]?.courses[0]?.heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course?.tag === value);
    setCourses(result[0]?.courses);
    setCurrentCard(result[0]?.courses[0]?.heading);
  };

  return (
    <div>
      <div className="text-4xl font-semibold md:text-center">
        Unlock the <HighlightedText text="Power of Code" />
      </div>
      <p className="text-center text-richblack-300 mt-4 mb-12">
        Learn to Build Anything You Can Imagine
      </p>
      <div className="w-full flex justify-center items-center">
        <div className="w-fit mx-auto flex item-center gap-0 md:gap-2 md:m-2 bg-richblack-700 p-2 rounded-full">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setMyCards(tab)}
              className={`text-xs md:text-base flex item-center gap-2 rounded-full transition-all 
            duration-200 cursor-pointer hover:bg-richblack-800 py-2 px-[4px] md:px-4 lg:py-3 lg:px-6
             ${
               currentTab === tab
                 ? "bg-richblack-900 text-richblack-5 font-medium"
                 : "text-richblack-200"
             } `}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div className="h-[50px] md:h-[120px]" />
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col flex-wrap gap-10 md:flex-row justify-center lg:justify-between pb-5 lg:absolute items-center">
          {courses.map((course, index) => (
            <div key={index}>
              <CourseCard
                courseData={course}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            </div>
          ))}
        </div>
        <div className="lg:h-[200px]" />
      </div>
    </div>
  );
}

export default ExploreMore;
