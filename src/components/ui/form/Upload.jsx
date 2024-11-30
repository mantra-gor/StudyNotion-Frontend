import { TbCloudUpload } from "react-icons/tb";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FILE_CONFIG } from "../../../utils/constants";

function Upload({ register, name, setValue, errors = {} }) {
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

  const isFileValid = (file) => {
    if (
      file.type.split("/")[0] !== FILE_CONFIG.THUMBNAIL_SUPPORTED_MIME_TYPES
    ) {
      toast.error("Only Image are allowed!");
      return false;
    }
    if (file.size > FILE_CONFIG.THUMBNAIL_MAX_FILE_SIZE) {
      toast.error("File size is greated than 6MB!");
      return false;
    }
    if (file.length < 0) {
      toast.error("Please select a file!");
      return false;
    }
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (isFileValid(files[0])) {
      setFile(files[0]);
    }
  };

  const handleSelect = (e) => {
    const files = e.target.files;
    if (isFileValid(files[0])) {
      setFile(files[0]);
    }
  };

  const setFile = (file) => {
    console.log(file);
    if (previewFile) {
      URL.revokeObjectURL(previewFile);
    }
    setPreviewFile(URL.createObjectURL(file));
    setValue(name, file, { shouldValidate: true });
  };

  const removeImage = () => {
    setPreviewFile(null);
    register(name).onChange({ target: { files: [] } });
  };

  return (
    <div className="grid gap-y-1">
      <p>
        Course Thumbnails <sup className="text-[0.725rem] text-pink-200">*</sup>
      </p>

      <input
        type="file"
        ref={inputRef}
        name={name}
        id={name}
        className="hidden"
        onChange={handleSelect}
        accept="image/*"
      />

      {previewFile ? (
        <div className="flex flex-col gap-6 justify-center">
          <img
            src={previewFile}
            alt={name}
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
          htmlFor={name}
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
      {errors?.[name] && (
        <span className="text-pink-200 text-sm">Thumbnail is required</span>
      )}
    </div>
  );
}

export default Upload;
