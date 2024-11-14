"use client";

import RegisterForm from "@/src/components/RegisterForm/RegisterForm";
import { RegisterPageContainer } from "./page.styles";

const RegisterPage = () => {
  return (
    <RegisterPageContainer>
      <h1>Реєстрація</h1>
      <RegisterForm />
    </RegisterPageContainer>
  );
};

export default RegisterPage;
