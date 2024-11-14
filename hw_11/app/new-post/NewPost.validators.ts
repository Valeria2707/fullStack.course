import * as Yup from "yup";

export const validationSchema = Yup.object({
  image: Yup.mixed()
    .required("Будь ласка, виберіть зображення.")
    .test(
      "fileType",
      "Неправильний формат файлу. Потрібно вибрати зображення.",
      (value) => {
        if (value instanceof File) {
          return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
        }
        return false;
      }
    ),
  description: Yup.string()
    .required("Будь ласка, введіть опис.")
    .min(10, "Опис має містити щонайменше 10 символів."),
});
