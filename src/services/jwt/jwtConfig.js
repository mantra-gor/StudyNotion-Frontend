import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apiEndpoints";
const { REFRESH_TOKEN } = authEndpoints;

export async function tokenRefresh() {
  try {
    const token = { token: localStorage.getItem("refreshToken") };
    const response = await apiConnector("POST", REFRESH_TOKEN, token);
    const { accessToken, refreshToken } = response.data;
    console.log(response);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } catch (error) {
    console.error(error);
    localStorage.clear();
    window.location.replace("/login");
    toast("Your session expired!");
  }
}
