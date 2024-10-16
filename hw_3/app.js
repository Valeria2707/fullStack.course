const characterList = document.getElementById("character-list");
const loadingDiv = document.getElementById("loading");
const modal = document.getElementById("modal");

let currentPage = 1;
let isLoading = false;
let totalPages = null;

function createCharacter(character) {
  return `
    <img src="${character.image}" alt="${character.name}"/>
    <div class="character-info">
      <p><strong>Name: </strong> ${character.name}</p>
      <p><strong>Status: </strong> ${character.status}</p>
    </div>
  `;
}

async function fetchCharacters(page) {
  loadingDiv.style.display = "block";
  isLoading = true;

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await response.json();

    if (totalPages === null) {
      totalPages = data.info.pages;
    }

    data.results.forEach((character) => {
      const characterDiv = document.createElement("div");
      characterDiv.classList.add("character");
      characterDiv.setAttribute("data-id", character.id);
      characterDiv.innerHTML = createCharacter(character);
      characterList.appendChild(characterDiv);
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
  } finally {
    loadingDiv.style.display = "none";
    isLoading = false;
  }
}

async function fetchCharacterById(id) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const character = await response.json();

    const modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = `
      <span id="close-modal">&times;</span>
      ${createCharacter(character)}
    `;

    const closeModalBtn = modalContent.querySelector("#close-modal");
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.style.display = "block";
  } catch (error) {
    console.error("Error fetching character:", error);
  }
}

characterList.addEventListener("click", (event) => {
  const card = event.target.closest(".character");
  if (card && !isLoading) fetchCharacterById(card.dataset.id);
  event.stopPropagation();
});

window.addEventListener("click", (event) => {
  if (event.target === modal) modal.style.display = "none";
});

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const isLastPage = currentPage === totalPages;
  const scrollEnd = scrollTop + clientHeight >= scrollHeight - 3;
  if (scrollEnd && !isLoading && !isLastPage) {
    currentPage++;
    fetchCharacters(currentPage);
  }
};

window.addEventListener("scroll", handleScroll);
fetchCharacters(currentPage);
