import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/operations/authApi";

export const LogoutConfirmationContext = createContext();

export const LogoutConfirmationProvider = ({ children }) => {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout(navigate));
  };

  const cancelLogout = () => {
    setLogoutModalOpen(false);
  };

  return (
    <LogoutConfirmationContext.Provider
      value={{ logoutModalOpen, setLogoutModalOpen, logoutUser, cancelLogout }}
    >
      {children}
    </LogoutConfirmationContext.Provider>
  );
};
