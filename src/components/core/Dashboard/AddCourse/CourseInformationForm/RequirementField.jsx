import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

function RequirementField({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  const handleAddRequirement = (e) => {
    e.preventDefault();
    if (requirement) {
      setRequirementList((prev) => [...prev, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (e, index) => {
    e.preventDefault();
    const updateRequirementList = [...requirementList];
    updateRequirementList.splice(index, 1);
    setRequirementList(updateRequirementList);
  };

  const handleChange = (e) => {
    setRequirement(e.target.value);
  };

  return (
    <div className="grid gap-y-1">
      <label htmlFor={name}>
        {label} <sup className="text-[0.725rem] text-pink-200">*</sup>
      </label>
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          name={name}
          id={name}
          value={requirement}
          placeholder="Enter Requirements"
          onChange={handleChange}
          className={`w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 p-[12px] shadow-richblack`}
          style={{
            boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
        />
        <button
          className="bg-yellow-100 px-2 py-1 rounded-lg font-semibold active:scale-95"
          style={{
            boxShadow: " 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset",
          }}
          onClick={handleAddRequirement}
        >
          Add
        </button>
      </div>
      <ul className="grid gap-y-2 mt-1">
        {requirementList?.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-2 bg-richblack-600 p-2 rounded-lg"
          >
            <p>{item}</p>
            <button onClick={(e) => handleRemoveRequirement(e, index)}>
              <IoMdCloseCircleOutline size={24} />
            </button>
          </li>
        ))}
      </ul>
      {errors[name] && (
        <span className="text-pink-200 text-sm">
          Course Benifits is required
        </span>
      )}{" "}
    </div>
  );
}

export default RequirementField;
