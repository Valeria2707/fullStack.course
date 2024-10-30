export const fetchHeroes = async (page = 1) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching hero:", error);
  }
};
