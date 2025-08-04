import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apiEndpoints";

const { CATALOG_DATA_API } = catalogData;

export const getCatalogPageData = async (categoryId) => {
  let result = [];
  try {
    const res = await apiConnector("POST", CATALOG_DATA_API, {
      categoryId,
    });
    if (res.success) {
      result = res.data;
    } else {
      throw new Error("Could not fetch calatog data");
    }
  } catch (error) {
    console.error("Failed to fetch calatog data: ", error);
    result = error.response?.data;
    return toast.error(error.response.data.message);
  } finally {
    return result;
  }
};
