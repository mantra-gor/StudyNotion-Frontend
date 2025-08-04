import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../utils/constants";

function useAuth() {
  const user = useSelector((state) => state.profile.user);

  const isLoggedin = !!user;
  const isInstructor = user?.accountType === ACCOUNT_TYPE.INSTRUCTOR;
  const isStudent = user?.accountType === ACCOUNT_TYPE.STUDENT;
  const isAdmin = user?.accountType === ACCOUNT_TYPE.ADMIN;

  return {
    user,
    isLoggedin,
    isInstructor,
    isStudent,
    isAdmin,
  };
}

export default useAuth;
