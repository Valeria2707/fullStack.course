import React, { useState } from "react";
import useApi from "./hooks/useApi.js";
import "./App.css";

function App() {
  const [page, setPage] = useState(1);
  const { data, error, loading } = useApi(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );

  const isCharacters = data?.results;
  const theLastPage = data?.info.pages;
  const isDisabledNextButtun = page === theLastPage;
  const isDisabledPrevButtun = page === 1;

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => prev - 1);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="centerItem">
      <div className="container centerItem">
        <h1>Rick & Morty</h1>
        <div className="character-list">
          {isCharacters ? (
            data.results.map((character) => (
              <div key={character.id} className="character">
                <img src={character.image} alt={character.name} />
                <div className="character-info">
                  <p>
                    <strong>Name: </strong>
                    {character.name}
                  </p>
                  <p>
                    <strong>Status: </strong>
                    {character.status}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No characters found.</p>
          )}
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={isDisabledPrevButtun}>
            Prev
          </button>
          <span className="current-page">{page}</span>
          <button onClick={handleNextPage} disabled={isDisabledNextButtun}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
