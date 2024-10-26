import { TbCloudUpload } from "react-icons/tb";
import { useRef, useState } from "react";

function Upload({ register }) {
  const [dragActive, setDragActive] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const setFile = (file) => {
    setPreviewFile(URL.createObjectURL(file));
    register("thumbnail").onChange({ target: { files: [file] } });
  };

  const removeImage = () => {
    setPreviewFile(null);
    register("thumbnail").onChange({ target: { files: [] } });
  };

  return (
    <div className="grid gap-y-1">
      <p>
        Course Thumbnails <sup className="text-[0.725rem] text-pink-200">*</sup>
      </p>

      <input
        type="file"
        ref={inputRef}
        name="fileUpload"
        id="fileUpload"
        className="hidden"
        onChange={handleSelect}
        accept="image/*"
      />

      {previewFile ? (
        <div className="flex flex-col gap-6 justify-center">
          <img
            src={previewFile}
            alt="thumbnail"
            className="h-[260px] object-cover rounded-lg"
          />
          <button
            style={{
              boxShadow: "-0.5px -1.5px 0px 0px rgba(0, 0, 0, 0.12) inset",
            }}
            className="p-3 rounded-lg border-2 border-richblack-500 text-richblack-50 hover:bg-richblack-700 duration-200"
            onClick={removeImage}
          >
            Remove
          </button>
        </div>
      ) : (
        <label
          htmlFor="fileUpload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div
            className={`h-[260px] p-4 text-richblack-400 bg-richblack-700 border-2 rounded-xl border-richblack-600 border-dashed grid place-items-center duration-200 ${
              dragActive ? "bg-opacity-50 border-yellow-400 scale-95" : ""
            }`}
          >
            <div className="bg-pure-greys-800 w-14 h-14 flex justify-center items-center rounded-full">
              <TbCloudUpload size={25} className="text-yellow-50" />
            </div>
            <p className="px-14 text-center">
              Drag and drop an image, or
              <span className="text-yellow-50 font-semibold cursor-pointer">
                {" "}
                Browse{" "}
              </span>{" "}
              Max 6MB each (12MB for videos)
            </p>
            <ul className="flex justify-around text-sm w-full">
              <li>• Aspect ratio 16:9</li>
              <li>• Recommended size 1024x576</li>
            </ul>
          </div>
        </label>
      )}
    </div>
  );
}

export default Upload;
