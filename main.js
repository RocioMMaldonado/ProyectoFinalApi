const container = document.getElementById("container");
const txtCharacter = document.getElementById("txt-character");
const btnGenderless = document.getElementById("btn-genderless");
const btnFemale = document.getElementById("btn-female");
const btnMale = document.getElementById("btn-male");
const btnUnknown = document.getElementById("btn-unknown");
const btnTodos = document.getElementById("btn-todos");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnUltima = document.getElementById("btn-ult");
const btnPrimera = document.getElementById("btn-prim");
const countCharacters = document.getElementById("container-all-characters");

let page = 1;
let totalpaginas = 0;
const getCharacters = () => {
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      renderCharacters(data)
      totalpaginas = data.info.pages;
    });
};

getCharacters();

const renderCharacters = (data) => {
  //console.log(data);
 
 container.innerHTML= "";
 countCharacters.innerHTML = `<p id= "all-characters">Number of characters: ${data.info.count} </p>`
  data.results.forEach((character) => {
    // console.log(character);
    container.innerHTML += `
    <div class="card" id="card" >
    <img id="card-img" src="${character.image}" alt="">
    <div class="card-description">
      <h2>${character.name}</h2>
    </div>
    <div class="card-button">
    <button class="btn-seeMore" id="btn-seeMore" onclick=verDescripcion("${character.url}")> See more..</button>
    </div>
    
    
</div>
`;
  });
};

//INPUT

//CANTIDAD DE PERSONAJES

//BOTON VER MAS Y VOLVER
const verDescripcion = (characterUrl) => {
  fetch(characterUrl)
    .then((res) => res.json())
    .then((characterUrl) => {
      container.innerHTML = `
<div class="card-seeMore" id="card-seeMore">
    <img src="${characterUrl.image}" alt="">
    <div class="description-card-seeMore">
      <h2>${characterUrl.name}</h2>
      <p>GENDER: ${characterUrl.gender}</p>
      <p>LOCATION: ${characterUrl.location.name}</p>
      <p>SPECIES: ${characterUrl.species}</p>
      <p>STATUS: ${characterUrl.status}</p>
      <p>ORIGIN: ${characterUrl.origin.name}</p>
      <p>TYPE: ${characterUrl.tipe}</p>
      <p>NUMBER OF EPISODES: ${characterUrl.episode.length}</p>
    <div class="card-btn-return">
    <button class="btn-return" onclick="getCharacters(page)"> Return</button>
    </div>
      
  </div>
  </div>`;
    });
};

//CANTIDAD DE PERSONAJES

//FILTRO DE GENDER
const filterCharacters = (filterParam, valueParam) => {
  fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&${filterParam}=${valueParam}`
  )
    .then((res) => res.json())
    .then((data) => renderCharacters(data));
};

btnFemale.addEventListener("click", () => filterCharacters("gender", "female"));

btnMale.addEventListener("click", () => filterCharacters("gender", "male"));

btnUnknown.addEventListener("click", () =>
  filterCharacters("gender", "unknown")
);

btnGenderless.addEventListener("click", () =>
  filterCharacters("gender", "Genderless")
);

btnTodos.addEventListener("click", () => filterCharacters("gender", ""));

//boton siguiente antes
btnPrev.addEventListener("click", () => {
  page -= 1;
  if (page <= 1) {
    btnPrev.setAttribute("disabled", true);
    btnPrimera.setAttribute("disabled", true);
  } else {
    btnNext.removeAttribute("disabled", true);
  }
  getCharacters(page);
});

btnNext.addEventListener("click", () => {
  page += 1;
  getCharacters(page);
  if (page > 1) {
    btnPrev.removeAttribute("disabled", true);
    btnPrimera.removeAttribute("disabled", true);
  }
  if (page >= totalpaginas) {
    btnNext.setAttribute("disabled", true);
  }
});

btnPrimera.addEventListener("click", () => {
  page = 1;
  getCharacters(page);
  if (page >= 1) {
    btnNext.removeAttribute("disabled", true);
    btnUltima.removeAttribute("disabled", true);
  }
});

btnUltima.addEventListener("click", () => {
  page = totalpaginas;
  getCharacters(page);
  if (page >= 1) {
    btnPrev.removeAttribute("disabled", true);
    btnPrimera.removeAttribute("disabled", true);
  }
  if (page >= totalpaginas){
    btnUltima.setAttribute("disabled", true);
    btnNext.setAttribute("disabled", true);
  }
});
