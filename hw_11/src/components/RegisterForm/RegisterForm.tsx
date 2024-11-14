import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "../../api/userActions";
import { FormContainer } from "./RegisterForm.styles";
import { validationSchema } from "./RegisterForm.validator";

const RegisterForm = () => {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await registerUser(values);
      if (response) {
        router.push("/home/1");
      }
    } catch {
      console.error("Реєстрація не вдалася");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormContainer>
          <Form>
            <div>
              <label htmlFor="username">Ім`я:</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Пароль:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              style={{ marginTop: "15px", width: "100%" }}
            >
              {isLoading ? "Реєстрація..." : "Зареєструватися"}
            </button>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default RegisterForm;
