const characterList = document.getElementById("character-list");
const currentPageSpan = document.getElementById("current-page");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const loadingDiv = document.getElementById("loading");

let currentPage = 1;
let totalPages = 0;

async function fetchCharacters(page) {
  loadingDiv.style.display = "block";
  characterList.innerHTML = "";

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await response.json();

    totalPages = data.info.pages;

    currentPageSpan.innerText = currentPage;

    data.results.forEach((character) => {
      const characterDiv = document.createElement("div");
      characterDiv.classList.add("character");
      characterDiv.innerHTML = ` 
                    <img src=${character.image} alt=${character.name}/>
                    <div class="character-info">
                        <p><strong>Name: </strong> ${character.name}</p>
                        <p><strong>Status: </strong> ${character.status}</p>
                    </div>
            `;
      characterList.appendChild(characterDiv);
    });

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  } catch (error) {
    console.error("Error fetching characters:", error);
  } finally {
    loadingDiv.style.display = "none";
  }
}

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchCharacters(currentPage);
  }
});

fetchCharacters(currentPage);
