import LoginForm from "../../components/LoginForm/LoginForm";
import { LoginPageContainer } from "./LoginPage.styles";

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <h1>Вхід</h1>
      <LoginForm />
    </LoginPageContainer>
  );
};

export default LoginPage;
