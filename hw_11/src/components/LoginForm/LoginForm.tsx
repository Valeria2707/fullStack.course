import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useLoginUserMutation } from "../../api/userActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormContainer } from "./LoginForm.styles";
import { validationSchema } from "./LoginForm.validators";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user || localStorage.getItem("token")) {
      router.push("/home/1");
    }
  }, [user, router]);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await loginUser(values);
      if (response) {
        router.push("/home/1");
      }
    } catch {
      console.error("Помилка при вході");
    }
  };

  const handleRegister = () => router.push("/register");

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
              <label htmlFor="username">Ім`я:</label>
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
