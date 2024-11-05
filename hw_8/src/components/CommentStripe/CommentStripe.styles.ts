import styled from "styled-components";

export const CommentStripeContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: #d63384;
    margin-bottom: 1rem;
    font-family: "Poppins", sans-serif;
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 1rem;
      padding: 0.5rem 1rem;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

      strong {
        display: block;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        color: #333;
      }

      p {
        margin: 0.5rem 0;
        color: #555;
      }

      button {
        margin-top: 0.5rem;
        padding: 0.4rem 1rem;
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
      }
    }
  }

  p {
    color: #888;
    text-align: center;
  }

  button {
    display: block;
    margin: 1rem auto;
    padding: 0.6rem 1.5rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    background-color: #ff69b4;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ff1493;
    }
  }
`;
