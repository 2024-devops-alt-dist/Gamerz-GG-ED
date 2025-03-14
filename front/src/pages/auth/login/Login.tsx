import AuthTemplate from "../AuthTemplate";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return <AuthTemplate content={<LoginForm />}></AuthTemplate>;
};

export default Login;
