const container = document.getElementById("container");
//const textCharacter = document.getElementById("text-character");
//const gender = document.getElementById("gender");
const bntTodos = document.getElementById("btn-todos");
const bntFemale = document.getElementById("btn-female");
const bntMale = document.getElementById("btn-male");



const getCharacters = () => {
  fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then((data) => renderCharacters(data))
};

getCharacters();

const renderCharacters = (data) => {
  container.innerHTML= "";
  console.log(data);
  data.results.forEach((character) => {
    console.log(character);
    container.innerHTML += 
    `<div class="card" id="card" >
    <img src="${character.image}" alt="">
    <div class="description-card">
      <h2>${character.name}</h2>
    </div>
    <button class="btn-vermas" id="btn-vermas" onclick=verDescripcion("${character.url}")> Ver mas..</button>
</div>`;
  });
};


const verDescripcion = (characterUrl) => {
  container.innerHTML = ""
  fetch(characterUrl)
    .then((res) => res.json())
    .then((character) => {
      container.innerHTML =
`<div class="card" id="card" >
    <img src="${character.image}" alt="">
    <div class="description-card">
      <h2>${character.name}</h2>
      <p>${character.gender}</p>
      <p>${character.location.name}</p>
      <p>${character.species}</p>
      <p>${character.status}</p>
      <p>${character.origin.name}</p>
      <p>${character.episode}</p>
      <p>${character.tipe}</p>
    </div>
    <button class="btn-prev" onclick="getCharacters()"> Volver</button>
  </div>`
    })
};

const filterCharacters = (filterParam, valueParam) =>{
  fetch(`https://rickandmortyapi.com/api/character/?${filterParam}=${valueParam}`)
    .then((res) => res.json())
    .then((data) => renderCharacters(data))
}


bntFemale.addEventListener("click", () => 
  filterCharacters("gender", "female")
)
/*
const btnPrev = getElementById("btn-prev");
btnPrev.addEventListener("click", volver);

function volver(){
  container.innerHTML += 
  `<div class="card" id="card" >
  <img src="${character.image}" alt="">
  <div class="description-card">
    <h2>${character.name}</h2>
  </div>
  <button class="btn-vermas" onclick=verDescripcion("${character.url}")> Ver mas..</button>
</div>`;
}



/* const filterGender = renderCharacters.filter (${character.gender} =>{
     console.log(filterGender);
    return ${character.gender} === "Male";
  })

 
    



/*
let productosFiltrados = productos.filter(producto => {
  // if(producto.nombre === "Smart TV Philips 6900" ){ esto es igual a
  if (producto.nombre.includes("Smart TV Philips 6900")) {
       return producto;
   };
})
console.log(productosFiltrados);

/*const verDescripcion = (detalles) => {
  container.innerHTML = ""
   `<div class="card" id="card">
     <img src="${character.image}" alt="">
     <div class="description-card">
       <h2>${character.name}</h2>
     </div> 
    <button class="btn" onclick=verDescripcion> Ver mas</button>
    </div>`;
};

*/
