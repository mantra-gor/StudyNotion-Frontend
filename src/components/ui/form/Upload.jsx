import { TbCloudUpload } from "react-icons/tb";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FILE_CONFIG } from "../../../utils/constants";

function Upload({
  allowedFileType = "image",
  editData = null,
  viewData = null,
  errors = {},
  fileState,
  setValue,
  register,
  label,
  name,
}) {
  const [dragActive, setDragActive] = useState(false);
  const [previewFile, setPreviewFile] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);
  const videoRef = useRef(null);

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
    //validation for image
    if (allowedFileType == "image") {
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
    } else if (allowedFileType == "video") {
      if (file.type.split("/")[0] !== FILE_CONFIG.COURSE_SUPPORTED_MIME_TYPES) {
        toast.error("Only Image are allowed!");
        return false;
      }
      if (file.size > FILE_CONFIG.COURSE_MAX_FILE_SIZE) {
        toast.error("File size is greated than 400MB!");
        return false;
      }
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
      const file = file[0];
      setFile(file);

      const fileMetadata = {
        fileName: file.name,
        size: file.size,
        contentType: file.type,
      };
      fileState(fileMetadata);
    }
  };

  const handleSelect = (e) => {
    const files = e.target.files;
    if (isFileValid(files[0])) {
      const file = files[0];
      setFile(files[0]);

      const fileMetadata = {
        fileName: file.name,
        size: file.size,
        contentType: file.type,
      };
      fileState(fileMetadata);

      // console.log(fileMetadata);
    }
  };

  const setFile = (file) => {
    if (previewFile) {
      URL.revokeObjectURL(previewFile);
    }
    const objUrl = URL.createObjectURL(file);
    setPreviewFile(objUrl);
    setValue(name, file, { shouldValidate: true });
  };

  const removeImage = () => {
    setPreviewFile(null);
    register(name).onChange({ target: { files: [] } });
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setValue("duration", video.duration);
    // console.log(`The video is ${video.duration} seconds long.`);
  };

  return (
    <div className="grid gap-y-1">
      <p>
        {label}
        <sup className="text-[0.725rem] text-pink-200">*</sup>
      </p>

      <input
        type="file"
        ref={inputRef}
        name={name}
        id={name}
        className="hidden"
        onChange={handleSelect}
        accept={`${allowedFileType === "video" ? "video/*" : "image/*"}`}
      />

      {previewFile ? (
        <div className="flex flex-col gap-6 justify-center">
          {allowedFileType == "image" ? (
            <img
              src={previewFile}
              alt={name}
              className="h-[260px] object-cover rounded-lg"
            />
          ) : (
            <video
              ref={videoRef}
              controls
              src={previewFile}
              alt={name}
              onLoadedMetadataCapture={handleLoadedMetadata}
              className="h-full object-cover rounded-lg"
            />
          )}

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
            <div className="bg-pure-greys-800/60 w-14 h-14 flex justify-center items-center rounded-full">
              <TbCloudUpload size={25} className="text-yellow-50" />
            </div>
            <p className="px-14 text-center">
              Drag and drop an image, or
              <span className="text-yellow-50 font-semibold cursor-pointer">
                {" "}
                Browse{" "}
              </span>{" "}
              {allowedFileType === "video"
                ? "Max 400MB each videos"
                : "Max 6MB for Image"}
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
