import { useSelector } from "react-redux";

function ForgetPassword() {
  const { loading } = useSelector((state) => state.auth);
  return <div>{loading ? <p>loading...</p> : <div></div>}</div>;
}

export default ForgetPassword;
