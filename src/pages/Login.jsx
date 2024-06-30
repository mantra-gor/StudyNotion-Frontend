import Template from "../components/core/auth/Template";
import loginImg from "../assets/Images/login.webp";

function Login() {
  return (
    <div>
      <Template
        title="Welcome Back"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        image={loginImg}
        formtype="login"
      />
    </div>
  );
}

export default Login;
