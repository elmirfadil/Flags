let block = document.querySelector(".block");
let searchInput = document.querySelector(".searchInput");
let searchBtn = document.querySelector(".searchBtn");
let all = document.querySelector(".all");
let select = document.querySelector("select");
let API = "https://restcountries.com/v3.1/all";

getApiData();

function getApiData() {
  fetch(API)
    .then((data) => data.json())
    .then((flags) => {
      flags.sort((a, b) => a.name.common.localeCompare(b.name.common));
      displayCountries(flags);
    });
}

function displayCountries(flags) {
  block.innerHTML = "";
  flags.forEach((el) => {
    let box = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("h3");
    let population = document.createElement("p");
    let region = document.createElement("p");
    let subregion = document.createElement("p");

    box.classList.add("box");

    img.src = el.flags.png;
    img.alt = el.flags.alt;
    name.innerText = "Country: " + el.name.common;
    population.innerText = "Population: " + el.population;
    region.innerText = "Region: " + el.region;
    subregion.innerText = "Subregion: " + el.subregion;

    box.append(img);
    box.append(name);
    box.append(population);
    box.append(region);
    box.append(subregion);
    block.append(box);
  });
}

select.addEventListener("change", (event) => {
  let selectedValue = event.target.value;

  if (selectedValue === "az") {
    getApiData();
  } else if (selectedValue === "za") {
    fetch(API)
      .then((data) => data.json())
      .then((flags) => {
        flags.sort((a, b) => b.name.common.localeCompare(a.name.common));
        displayCountries(flags);
      });
  } else if (selectedValue === "population") {
    fetch(API)
      .then((data) => data.json())
      .then((flags) => {
        flags.sort((a, b) => b.population - a.population);
        displayCountries(flags);
      });
  }
});

searchBtn.addEventListener("click", () => {
  block.innerHTML = "";
  searchOneFlag();
});

all.addEventListener("click", () => {
  block.innerHTML = "";
  getApiData();
});

function searchOneFlag() {
  if (searchInput.value.trim() !== "") {
    fetch(`https://restcountries.com/v3.1/name/${searchInput.value}`)
      .then((data) => data.json())
      .then((onFlags) => {
        block.innerHTML = "";

        onFlags.forEach((el) => {
          searchInput.value = "";

          let box = document.createElement("div");
          let img = document.createElement("img");
          let name = document.createElement("h3");
          let population = document.createElement("p");
          let region = document.createElement("p");
          let subregion = document.createElement("p");

          box.classList.add("box");

          img.src = el.flags.png;
          img.alt = el.flags.alt;
          name.innerText = "Country: " + el.name.common;
          population.innerText = "Population: " + el.population;
          region.innerText = "Region: " + el.region;
          subregion.innerText = "Subregion: " + el.subregion;

          box.append(img);
          box.append(name);
          box.append(population);
          box.append(region);
          box.append(subregion);
          block.append(box);
        });
      });
  }
}

searchBtn.addEventListener("click", () => {
  block.innerHTML = "";
  searchOneFlag();
});

all.addEventListener("click", () => {
  block.innerHTML = "";
  getApiData();
});
