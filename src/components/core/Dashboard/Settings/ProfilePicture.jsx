import { useCallback, useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { uploadToS3 } from "../../../../services/aws/s3Services";
import toast from "react-hot-toast";
import { updateProfilePicture } from "../../../../services/operations/dashboardApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../redux/slices/profileSlice";

function ProfilePicture({ user }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const fileHandler = useCallback((e) => {
    const choosenFile = e.target.files[0];
    setFile(choosenFile);
  }, []);

  const uploadProfilePicture = async () => {
    if (file) {
      const toastId = toast.loading("Uploading...");
      const fileMetadata = {
        fileName: file.name,
        size: file.size,
        contentType: file.type,
      };

      const { uploadResponse, fileKey } = await uploadToS3(
        fileMetadata,
        file,
        "profile-picture"
      );
      if (uploadResponse.status !== 200) {
        return toast.error("Failed to upload file!");
      }
      const res = await updateProfilePicture({ objectUrl: fileKey.objectUrl });

      if (res.success) {
        toast.success("Upload complete!", { id: toastId });
        setFile(null);
        dispatch(setUser(res.data));
      } else {
        toast.error("Upload failed!", { id: toastId });
      }
    } else {
      toast("Please select a picture.");
    }
  };

  return (
    <div>
      <div className=" bg-richblack-800 border border-richblack-700 p-4 md:px-8 md:py-6 rounded-md">
        <div className="flex justify-between">
          <div className="flex items-center gap-8">
            <img
              src={user?.avatar}
              alt="Avatar"
              className="w-12 md:w-16 rounded-full"
            />
            <div>
              <p className="text-richblack-5 text-lg font-semibold">
                Change Profile Picture
              </p>
              <div className="mt-3 flex items-center gap-2">
                <label
                  style={{
                    boxShadow:
                      "-0.5px -1.5px 0px 0px rgba(0, 0, 0, 0.12) inset",
                  }}
                  className="text-richblack-100 bg-richblack-600 py-2 px-4 rounded-md hover:bg-richblack-700 w-fit cursor-pointer"
                >
                  <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={fileHandler}
                  />
                  Choose
                </label>
                <button
                  style={{
                    boxShadow:
                      "-0.5px -1.5px 0px 0px rgba(0, 0, 0, 0.12) inset",
                  }}
                  className="bg-yellow-50 hover:bg-yellow-25 text-black py-2 px-4 rounded-md w-fit cursor-pointer flex items-center gap-2"
                  onClick={uploadProfilePicture}
                >
                  <LuUpload />
                  Upload
                </button>
              </div>
              <p className="mt-3 text-richblack-200 italic">
                {file && file.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicture;
