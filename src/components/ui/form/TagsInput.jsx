import { useState } from "react";

function TagsInput() {
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    console.log(e.key);

    setTags((prev) => [...prev, e.key]);
  };
  return (
    <div>
      <label className="grid gap-y-1" htmlFor="tags">
        <p>
          Tags <sup className=" text-[0.725rem] text-pink-200">*</sup>
        </p>
        <div>
          {tags.map((tag, index) => (
            <span key={index}>{tag}M</span>
          ))}
        </div>
        <input
          name="tags"
          id="tags"
          type="text"
          placeholder="Enter tags (press 'Enter' or ',' after each tag)"
          className="w-full h-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 md:p-[12px] py-[12px] shadow-richblack"
          style={{
            boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
}

export default TagsInput;
