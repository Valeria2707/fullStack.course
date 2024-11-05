import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { RegisterPageContainer } from "./RegisterPage.styles";

const RegisterPage = () => {
  return (
    <RegisterPageContainer>
      <h1>Реєстрація</h1>
      <RegisterForm />
    </RegisterPageContainer>
  );
};

export default RegisterPage;
