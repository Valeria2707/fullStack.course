"use client";
import LoginForm from "@/src/components/LoginForm/LoginForm";
import { LoginPageContainer } from "./page.styles";

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <h1>Вхід</h1>
      <LoginForm />
    </LoginPageContainer>
  );
};

export default LoginPage;
