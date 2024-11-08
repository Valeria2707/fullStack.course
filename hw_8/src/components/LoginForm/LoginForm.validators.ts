import * as Yup from "yup";

export const validationSchema = Yup.object({
  username: Yup.string()
    .min(4, "Ім'я користувача повинно бути не менше 4 символів")
    .required("Ім'я користувача обов'язкове"),
  password: Yup.string()
    .min(4, "Пароль повинен бути не менше 4 символів")
    .required("Пароль обов'язковий"),
});
