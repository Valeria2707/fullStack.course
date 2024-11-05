import styled from "styled-components";

export const CommentContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  textarea {
    width: 100%;
    max-width: 500px;
    height: 80px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    resize: vertical;
    transition: border-color 0.3s;

    &:focus {
      border-color: #d63384;
    }
  }

  button {
    width: 100%;
    max-width: 150px;
    margin: 0.5rem 0;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: #ff69b4;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ff1493;
    }

    &:disabled {
      background-color: #f0a6bf;
      cursor: not-allowed;
    }
  }
`;
