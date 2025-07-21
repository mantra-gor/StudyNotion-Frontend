// import { useSelector } from "react-redux";
// import { FaCheck } from "react-icons/fa6";
// import CourseInformationForm from "./CourseInformationForm/CourseInformationForm";
// import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
// import PublishCourse from "./CourseBuilder/PublishCourse";

// function CourseStepper() {
//   const { step } = useSelector((state) => state.course);
//   // const step = 2; //! !testing only

//   const steps = [
//     {
//       id: 1,
//       title: "Course Information",
//     },
//     {
//       id: 2,
//       title: "Course Builder",
//     },
//     {
//       id: 3,
//       title: "Publish Course",
//     },
//   ];
//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         {steps.map((item) => (
//           <div
//             key={item.id}
//             className="flex flex-col justify-evenly items-center gap-3"
//           >
//             <div
//               className={`${
//                 step === item.id
//                   ? " bg-yellow-900 border-yellow-50 text-yellow-50"
//                   : " border-richblack-100 bg-richblack-800 text-richblack-300 "
//               }
//               ${step > item.id && "bg-yellow-50 border-yellow-50"}
//                w-10 h-10 rounded-full flex justify-center items-center border text-lg font-semibold`}
//             >
//               {step > item.id ? (
//                 <FaCheck className="text-richblack-800" />
//               ) : (
//                 item.id
//               )}
//             </div>
//             {/* Add Dashes ---------------------- */}
//             {/* {item.id !== steps.length} */}
//             <div className="text-sm">{item.title}</div>
//           </div>
//         ))}
//       </div>
//       {step === 1 && <CourseInformationForm />}
//       {step === 2 && <CourseBuilderForm />}
//       {step === 3 && <PublishCourse />}
//     </div>
//   );
// }

// export default CourseStepper;

// ?

import { useSelector } from "react-redux";
import { FaCheck, FaBookOpen, FaHammer, FaRocket } from "react-icons/fa6";
import CourseInformationForm from "./CourseInformationForm/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./CourseBuilder/PublishCourse";

function CourseStepper() {
  const { step } = useSelector((state) => state.course);
  // const step = 2; // !testing only

  const steps = [
    {
      id: 1,
      title: "Course Information",
      subtitle: "Basic details and overview",
      icon: FaBookOpen,
    },
    {
      id: 2,
      title: "Course Builder",
      subtitle: "Structure and content",
      icon: FaHammer,
    },
    {
      id: 3,
      title: "Publish Course",
      subtitle: "Review and launch",
      icon: FaRocket,
    },
  ];

  return (
    <div className="mantra space-y-12">
      {/* Enhanced Stepper Header */}
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-richblack-800 rounded-full">
          <div
            className="h-full bg-yellow-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Step Items */}
        <div className="relative flex justify-between items-start">
          {steps.map((item, index) => {
            const isActive = step === item.id;
            const isCompleted = step > item.id;
            const isPending = step < item.id;
            const IconComponent = item.icon;

            return (
              <div
                key={item.id}
                className={`flex flex-col items-center transition-all duration-500 ease-out group ${
                  isActive ? "transform scale-105" : ""
                }`}
              >
                {/* Step Circle */}
                <div className="relative mb-4">
                  {/* Pulse Animation for Active Step */}
                  {isActive && (
                    <div className="absolute inset-0 w-12 h-12 rounded-full bg-yellow-900 opacity-20 animate-pulse" />
                  )}

                  {/* Main Circle */}
                  <div
                    className={`
                      relative w-12 h-12 rounded-full flex justify-center items-center
                      border-2 transition-all duration-500 ease-out
                      ${
                        isActive
                          ? "bg-yellow-900 border-yellow-50 text-yellow-50 shadow-lg shadow-yellow-900/30"
                          : isCompleted
                          ? "bg-yellow-50 border-yellow-50 text-richblack-800 shadow-md"
                          : "border-richblack-100 bg-richblack-800 text-richblack-300 group-hover:border-richblack-50"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <FaCheck className="text-sm transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <IconComponent
                        className={`text-sm transition-all duration-300 ${
                          isActive ? "scale-110" : "group-hover:scale-105"
                        }`}
                      />
                    )}
                  </div>

                  {/* Active Step Indicator Ring */}
                  {isActive && (
                    <div
                      className="absolute inset-0 w-12 h-12 rounded-full border-2 border-yellow-50 opacity-40 animate-spin"
                      style={{ animationDuration: "3s" }}
                    />
                  )}
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <div
                    className={`text-sm font-semibold transition-all duration-300 mb-1
                    ${
                      isActive
                        ? "text-yellow-50"
                        : isCompleted
                        ? "text-yellow-50"
                        : "text-richblack-300 group-hover:text-richblack-100"
                    }
                  `}
                  >
                    {item.title}
                  </div>

                  {/* Subtitle */}
                  {/* <div
                    className={`
                    text-xs transition-all duration-300 leading-tight
                    ${
                      isActive
                        ? "text-yellow-50/80"
                        : isCompleted
                        ? "text-yellow-50/60"
                        : "text-richblack-400 group-hover:text-richblack-300"
                    }
                  `}
                  >
                    {item.subtitle}
                  </div> */}

                  {/* Step Number Indicator */}
                  <div
                    className={`
                    mt-2 text-xs font-mono transition-all duration-300
                    ${
                      isActive
                        ? "text-yellow-50/60"
                        : isCompleted
                        ? "text-yellow-50/40"
                        : "text-richblack-500"
                    }
                  `}
                  >
                    Step {item.id} of {steps.length}
                  </div>
                </div>

                {/* Connecting Line for Mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-px h-8 bg-yellow-400 mt-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content with Transition */}
      <div className="relative">
        <div className="transition-all duration-500 ease-out">
          {step === 1 && (
            <div className="animate-fadeIn">
              <CourseInformationForm />
            </div>
          )}
          {step === 2 && (
            <div className="animate-fadeIn">
              <CourseBuilderForm />
            </div>
          )}
          {step === 3 && (
            <div className="animate-fadeIn">
              <PublishCourse />
            </div>
          )}
        </div>
      </div>

      {/* Custom Styles */}
    </div>
  );
}

export default CourseStepper;
