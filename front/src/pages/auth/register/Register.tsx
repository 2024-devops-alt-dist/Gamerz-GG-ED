import AuthTemplate from "../AuthTemplate";
import RegisterForm from "./components/RegisterForm";

const Register = () => {
  return <AuthTemplate content={<RegisterForm />}></AuthTemplate>;
};

export default Register;
