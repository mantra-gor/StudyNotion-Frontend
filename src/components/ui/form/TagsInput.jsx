import { useEffect, useState } from "react";

function TagsInput({ setValue, errors }) {
  const [tags, setTags] = useState([]); // Stores all tags
  const [inputText, setInputText] = useState(""); // Temporary input for single tag entry
  const [errorMsg, setErrorMsg] = useState("");
  const maxTagLimit = 15;

  useEffect(() => {
    setValue("tags", tags); // Sync tags array with form state
  }, [tags, setValue]);

  const removeElementFromArray = (index) => {
    setTags((prev) => {
      const modifiedTags = prev.filter((_, idx) => idx !== index);
      if (modifiedTags.length < maxTagLimit) {
        setErrorMsg("");
      }
      return modifiedTags;
    });
  };

  const handleKeyDown = (e) => {
    if (tags.length === maxTagLimit) {
      return setErrorMsg("You've reached the maximum number of tags allowed.");
    }

    if ((e.key === "," || e.key === "Enter") && inputText.trim()) {
      e.preventDefault();

      if (tags.includes(inputText.trim())) {
        setErrorMsg("Tag already exists.");
      } else {
        setTags((prev) => [...prev, inputText.trim()]); // Add tag to tags array
        setInputText(""); // Clear input after adding the tag
        setErrorMsg("");
      }
    }
  };

  const handleInputChange = (e) => {
    if (e.target.value !== ",") {
      setInputText(e.target.value);
    }
  };

  return (
    <div className="grid gap-y-1">
      <p>
        Tags <sup className=" text-[0.725rem] text-pink-200">*</sup>
      </p>

      {/* Display tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-1 mb-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              onClick={() => removeElementFromArray(index)}
              className="py-1 px-3 bg-yellow-300 w-fit rounded-full cursor-pointer hover:bg-richblack-400 duration-200"
            >
              {tag}
            </div>
          ))}
        </div>
      )}

      <label htmlFor="tags">
        <input
          name="tags"
          id="tags"
          type="text"
          autoComplete="off"
          placeholder="Enter tags (press 'Enter' or ',' after each tag)"
          className="w-full h-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 md:p-[12px] py-[12px] shadow-richblack"
          style={{
            boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
          // {...register("tags")}
          value={inputText}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
      </label>
      <p className="text-sm italic text-pink-200">
        {errorMsg || errors.tags?.message}
      </p>
    </div>
  );
}

export default TagsInput;
