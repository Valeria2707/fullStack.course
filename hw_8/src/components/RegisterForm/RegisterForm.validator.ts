import * as Yup from "yup";

export const validationSchema = Yup.object({
  username: Yup.string()
    .min(4, "Ім'я має бути не менше 4 символів")
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(4, "Пароль має бути не менше 4 символів")
    .required("Обов'язкове поле"),
});
