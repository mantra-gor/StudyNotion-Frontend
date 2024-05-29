import { HiUsers } from "react-icons/hi2";
import { TbBinaryTree2 } from "react-icons/tb";

function CourseCard({ courseData, currentCard, setCurrentCard }) {
  const { heading, description, level, lessonNumber } = courseData;
  const selectedCardShadow = {
    boxShadow: "12px 12px 0px 0px #FFD60A",
  };
  return (
    <div
      className={`mx-auto h-[300px] relative aspect-square ${
        currentCard === heading ? "bg-white" : "bg-richblack-800"
      } pt-6 px-4 cursor-pointer transition-all duration-200`}
      style={currentCard === heading ? selectedCardShadow : {}}
      onClick={() => setCurrentCard(heading)}
    >
      <h4
        className={`text-xl font-semibold ${
          currentCard === heading ? "text-richblack-800" : "text-richblack-25"
        } `}
      >
        {heading}
      </h4>
      <p
        className={`font-normal text-base ${
          currentCard === heading ? "text-richblack-500" : "text-richblack-400"
        }  mt-4`}
      >
        {description}
      </p>
      <div
        className={`absolute text-base w-full p-4 left-0 bottom-0 ${
          currentCard === heading ? "text-blue-500" : "text-richblack-300"
        }  flex items-center 
        justify-between border-t border-richblack-5 border-dashed`}
      >
        <div className="flex items-center gap-1">
          <HiUsers />
          {level}
        </div>
        <div className="flex items-center gap-1">
          <TbBinaryTree2 />
          {lessonNumber} Lessons
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
