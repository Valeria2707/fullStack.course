import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 1.5rem;

  div {
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 1rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #d63384;
    }
  }

  button {
    padding: 0.75rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #d63384;
    color: #fff;
    transition: background-color 0.3s;

    &:hover {
      background-color: #bf2a6c;
    }

    &:disabled {
      background-color: #f0a6bf;
      cursor: not-allowed;
    }
  }
`;
