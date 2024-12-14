import axios from "axios";
import { apiConnector } from "../apiConnector";
import { awsServicesEndpoints } from "../apiEndpoints";
import toast from "react-hot-toast";

const { GET_S3_UPLOAD_URL } = awsServicesEndpoints;

export async function uploadToS3(fileMeta, file, assetType) {
  try {
    const res = await apiConnector("POST", GET_S3_UPLOAD_URL, {
      fileMeta,
      assetType,
    });
    if (res.success) {
      const uploadResponse = await axios.put(res.data.url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      return { uploadResponse, fileKey: res.data.fileInfo };
    } else {
      return toast.error(res.message);
    }
  } catch (error) {
    console.error("Failed to create course: ", error);
    return toast.error(error.response.data.message);
  }
}
