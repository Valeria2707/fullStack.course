import styled from "styled-components";

export const NewPostContainer = styled.div`
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  width: 100%;

  h1 {
    color: #d63384;
    font-family: "Poppins", sans-serif;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.75rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
      font-size: 0.875rem;
      color: #333;
      margin-bottom: 0.25rem;
    }

    input[type="file"] {
      border: 1px solid #ddd;
      padding: 0.4rem;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.3s;
      font-size: 0.9rem;
      margin-bottom: 1rem;

      &:focus {
        border-color: #d63384;
      }
    }

    textarea {
      width: 100%;
      height: 100px;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      outline: none;
      resize: vertical;
      font-size: 0.9rem;
      transition: border-color 0.3s;

      &:focus {
        border-color: #d63384;
      }
    }

    .error {
      color: #d63384;
      font-size: 0.875rem;
      text-align: center;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      background-color: #ff69b4;
      color: #fff;
      font-weight: bold;
      font-size: 0.875rem;
      margin-top: 1rem;
      transition: background-color 0.3s;
      align-self: center;

      &:hover {
        background-color: #ff1493;
      }

      &:disabled {
        background-color: #f0a6bf;
        cursor: not-allowed;
      }
    }
  }
`;
