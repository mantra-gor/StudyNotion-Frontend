// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// function TagsInput({ label, name, placeholder, register, errors, setValue }) {
//   const [tags, setTags] = useState([]); // Stores all tags
//   const [inputText, setInputText] = useState(""); // Temporary input for single tag entry
//   const [errorMsg, setErrorMsg] = useState("");
//   const maxTagLimit = 15; // todo: Add this to constants file

//   const { editCourse, course } = useSelector((state) => state.course);

//   useEffect(() => {
//     if (editCourse) {
//       setTags(course?.tags);
//     }
//     register(name, { required: true, validate: (value) => value.length > 0 });
//   }, []);

//   useEffect(() => {
//     setValue("tags", tags); // Sync tags array with form state
//   }, [tags, setValue]);

//   const removeElementFromArray = (index) => {
//     setTags((prev) => {
//       const modifiedTags = prev.filter((_, idx) => idx !== index);
//       if (modifiedTags.length < maxTagLimit) {
//         setErrorMsg("");
//       }
//       return modifiedTags;
//     });
//   };

//   const handleKeyDown = (e) => {
//     if (tags.length === maxTagLimit) {
//       return setErrorMsg("You've reached the maximum number of tags allowed.");
//     }

//     if ((e.key === "," || e.key === "Enter") && inputText.trim()) {
//       e.preventDefault();

//       if (tags.includes(inputText.trim())) {
//         setErrorMsg("Tag already exists.");
//       } else {
//         setTags((prev) => [...prev, inputText.trim()]); // Add tag to tags array
//         setInputText(""); // Clear input after adding the tag
//         setErrorMsg("");
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     if (e.target.value !== ",") {
//       setInputText(e.target.value);
//     }
//   };

//   return (
//     <div className="grid gap-y-1">
//       <p>
//         {label} <sup className=" text-[0.725rem] text-pink-200">*</sup>
//       </p>

//       {/* Display tags */}
//       {tags?.length > 0 && (
//         <div className="flex flex-wrap gap-3 mt-1 mb-2">
//           {tags.map((tag, index) => (
//             <div
//               key={index}
//               onClick={() => removeElementFromArray(index)}
//               className="py-1 px-3 bg-yellow-300 w-fit rounded-full cursor-pointer hover:bg-richblack-400 duration-200"
//             >
//               {tag}
//             </div>
//           ))}
//         </div>
//       )}

//       <label htmlFor={name}>
//         <input
//           name={name}
//           id={name}
//           type="text"
//           autoComplete="off"
//           placeholder="Enter tags (press 'Enter' or ',' after each tag)"
//           className="w-full h-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 md:p-[12px] py-[12px] shadow-richblack"
//           style={{
//             boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
//           }}
//           value={inputText}
//           onKeyDown={handleKeyDown}
//           {...register(name, {
//             required: true,
//           })}
//           onChange={handleInputChange}
//         />
//       </label>
//       <p className="text-sm italic text-pink-200">
//         {errorMsg || errors.tags?.message}
//       </p>
//     </div>
//   );
// }

// export default TagsInput;

// ?
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MAX_TAGS = 15;

export default function TagsInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course);

  const [tags, setTags] = useState([]);
  const [inputText, setInputText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Initial tags for edit mode
  useEffect(() => {
    if (editCourse && course?.tags) {
      setTags(course.tags);
      setValue(name, course.tags); // sync with form state
    }

    register(name, {
      required: "At least one tag is required.",
      validate: (value) =>
        (Array.isArray(value) && value.length > 0) ||
        "At least one tag is required.",
    });
  }, []);

  // Sync tags with form
  useEffect(() => {
    setValue(name, tags);
  }, [tags, name, setValue]);

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputText.trim()) {
      e.preventDefault();
      const newTag = inputText.trim();

      if (tags.includes(newTag)) {
        setErrorMsg("Tag already exists.");
      } else if (tags.length >= MAX_TAGS) {
        setErrorMsg(`You can only add up to ${MAX_TAGS} tags.`);
      } else {
        setTags([...tags, newTag]);
        setInputText("");
        setErrorMsg("");
      }
    }
  };

  const handleRemoveTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setErrorMsg("");
  };

  const handleInputChange = (e) => {
    if (e.target.value !== ",") {
      setInputText(e.target.value);
    }
  };

  return (
    <div className="grid gap-y-1">
      <label htmlFor={name} className="text-sm text-richblack-5">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* Tag Display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1 mb-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              onClick={() => handleRemoveTag(idx)}
              className="px-3 py-1 rounded-full bg-yellow-300 text-sm cursor-pointer hover:bg-yellow-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Input */}
      <input
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        className="w-full bg-richblack-700 rounded-md text-richblack-5 p-3"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />

      {/* Error Message */}
      <p className="text-sm italic text-pink-200 mt-1">
        {errorMsg || errors[name]?.message}
      </p>
    </div>
  );
}
