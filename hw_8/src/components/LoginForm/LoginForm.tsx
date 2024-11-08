import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useLoginUserMutation } from "../../api/userActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormContainer } from "./LoginForm.styles";
import { validationSchema } from "./LoginForm.validators";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user || localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await loginUser(values);
      if (response) {
        navigate("/home");
      }
    } catch {
      console.error("Помилка при вході");
    }
  };

  const handleRegister = () => navigate("/register");

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormContainer>
          <Form>
            <div>
              <label htmlFor="username">Ім'я:</label>
              <Field type="text" id="username" name="username" required />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Пароль:</label>
              <Field type="password" id="password" name="password" required />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                style={{ marginTop: "15px" }}
              >
                {isLoading ? "Вхід..." : "Увійти"}
              </button>
              <button
                type="button"
                onClick={handleRegister}
                style={{ marginTop: "15px" }}
              >
                Зареєструватись
              </button>
            </div>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default LoginForm;
