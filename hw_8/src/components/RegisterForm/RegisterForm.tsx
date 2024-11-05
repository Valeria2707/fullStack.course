import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../api/userActions";
import { FormContainer } from "./RegisterForm.styles";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Паролі не співпадають");
      return;
    }

    try {
      const response = await registerUser({ username, password });
      if (response) {
        navigate("/home");
      }
    } catch {
      setErrorMessage("Реєстрація не вдалася");
    }
  };

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
      <div>
        <label htmlFor="confirmPassword">Підтвердження пароля:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Реєстрація..." : "Зареєструватися"}
      </button>
    </FormContainer>
  );
};

export default RegisterForm;
