import styled from "styled-components";

export const HomePageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 50px;
  background-color: #ffe6f2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  width: 100%;
`;

export const Header = styled.h1`
  color: #d63384;
  margin-bottom: 1.5rem;
  font-family: "Poppins", sans-serif;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 1rem;
`;

export const ActionButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: #ff69b4;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.3s;
  flex: 1;
  max-width: 180px;
  margin: 0 0.5rem;

  &:hover {
    background-color: #ff1493;
  }

  &:disabled {
    background-color: #f0a6bf;
    cursor: not-allowed;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .pagination {
    display: flex;
    list-style: none;
    gap: 0.5rem;

    li {
      border: 1px solid #d63384;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f8d7da;
      }
    }

    .active {
      font-weight: bold;
      background-color: #d63384;
      color: white;
    }

    .disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;
