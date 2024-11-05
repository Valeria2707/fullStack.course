import { useState, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useLoginUserMutation } from "../../api/userActions";
import { FormContainer } from "./LoginForm.styles";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const user = useSelector((state: RootState) => state.user.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user || localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      if (response) {
        navigate("/home");
      }
    } catch {
      console.error("Помилка при вході");
    }
  };

  const handleRegister = () => navigate("/register");

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Ім'я:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Вхід..." : "Увійти"}
      </button>
      <button type="button" onClick={handleRegister}>
        Зареєструватись
      </button>
    </FormContainer>
  );
};

export default LoginForm;
