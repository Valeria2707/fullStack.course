// Update your `Post` component to import the styled PostContainer
import styled from "styled-components";

export const PostContainer = styled.div`
  width: 50%;
  background-color: #ffffff;
  border: 2px solid #f8a1d1;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  .post-images img {
    border-radius: 8px;
    margin-top: 0.5rem;
  }

  p {
    color: #d63384;
    font-size: 18px;
    font-weight: 600;
  }

  button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: #ff69b4;
    color: white;
    font-weight: bold;
    &:hover {
      background-color: #ff1493;
    }
  }
`;
