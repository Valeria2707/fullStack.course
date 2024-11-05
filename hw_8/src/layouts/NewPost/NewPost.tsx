import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createExhibitAPI } from "../../api/exhibitActions";
import { NewPostContainer } from "./NewPost.styles";

const NewPost = () => {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createExhibitAPI,
    onSuccess: () => {
      navigate("/home");
    },
    onError: (err) => {
      console.error("Помилка при створенні поста:", err);
      setError("Не вдалося створити пост.");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError("Будь ласка, виберіть зображення.");
      return;
    }

    setError(null);
    mutation.mutate({ image, description });
  };

  return (
    <NewPostContainer>
      <h1>Створити новий пост</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Зображення:</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Опис:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Завантаження..." : "Створити пост"}
        </button>
      </form>
    </NewPostContainer>
  );
};

export default NewPost;
