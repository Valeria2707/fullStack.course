"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "./NewPost.validators";
import { useRouter } from "next/navigation";
import { useRequest } from "ahooks";
import { createExhibitAPI } from "@/src/api/exhibitActions";
import { NewPostContainer } from "./page.styles";

const NewPost = () => {
  const router = useRouter();

  const { run: createPost, loading } = useRequest(createExhibitAPI, {
    manual: true,
    onSuccess: () => router.push("/home/1"),
    onError: (err) => console.error("Помилка при створенні поста:", err),
  });

  return (
    <NewPostContainer>
      <h1>Створити новий пост</h1>
      <Formik
        initialValues={{ image: null, description: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (values.image) {
            createPost({
              image: values.image,
              description: values.description,
            });
          }
          setSubmitting(false);
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="image">Зображення:</label>
              <input
                type="file"
                id="image"
                onChange={(e) => {
                  if (e.target.files) {
                    setFieldValue("image", e.target.files[0]);
                  }
                }}
                accept="image/*"
              />
              <ErrorMessage name="image" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="description">Опис:</label>
              <Field as="textarea" id="description" name="description" />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </div>
            <button type="submit" disabled={isSubmitting || loading}>
              {loading ? "Завантаження..." : "Створити пост"}
            </button>
          </Form>
        )}
      </Formik>
    </NewPostContainer>
  );
};

export default NewPost;