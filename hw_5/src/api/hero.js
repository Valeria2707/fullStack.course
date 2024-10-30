export const fetchHeroById = async (id) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching hero:", error);
  }
};
