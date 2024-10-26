import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRole, element }) {
  const { user } = useSelector((state) => state.profile);

  if (!user) {
    return <Navigate to="/" replace={true} />;
  } else if (!allowedRole.includes(user.accountType)) {
    return <Navigate to="/" replace={true} />;
  }

  return element;
}

export default ProtectedRoute;
