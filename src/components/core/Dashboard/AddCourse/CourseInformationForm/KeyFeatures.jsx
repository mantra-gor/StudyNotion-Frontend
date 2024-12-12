import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

function KeyFeatures({ name, label, register, errors, setValue, getValues }) {
  const [feature, setFeature] = useState("");
  const [featuresList, setFeaturesList] = useState([]);

  useEffect(() => {
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, featuresList);
  }, [featuresList]);

  const handleAddRequirement = (e) => {
    e.preventDefault();
    if (feature) {
      setFeaturesList((prev) => [...prev, feature]);
      setFeature("");
    }
  };

  const handleRemoveRequirement = (e, index) => {
    e.preventDefault();
    const updateRequirementList = [...featuresList];
    updateRequirementList.splice(index, 1);
    setFeaturesList(updateRequirementList);
  };

  const handleChange = (e) => {
    setFeature(e.target.value);
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
          value={feature}
          placeholder="Enter what you'll learn"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddRequirement(e);
            }
          }}
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
        {featuresList?.map((item, index) => (
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
        <span className="text-pink-200 text-sm">Key Features is required</span>
      )}
    </div>
  );
}

export default KeyFeatures;
