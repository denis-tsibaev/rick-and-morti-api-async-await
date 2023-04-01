// https://rickandmortyapi.com/documentation

import throttle from 'lodash.throttle';
const THROTTLE_DELAY = 500;
const BASE_URL = 'https://rickandmortyapi.com/api/character/';

async function fetchApiCharacter(id) {
  try {
    const response = await fetch(`${BASE_URL}${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('error.message: ', error.message);
  }
}

const inputEl = document.querySelector('input#search-box');
const divEl = document.querySelector('.character-info');

inputEl.addEventListener('input', throttle(inputHandler, THROTTLE_DELAY));

function inputHandler(event) {
  const id = event.target.value;
  if (id === '') return {};
  fetchApiCharacter(id).then(render);
}

function render(data) {
  const { name, species, gender, status, image } = data;
  divEl.innerHTML = `
  <p><b>name: ${name}</b></p>
  <p>species: ${species}</p>
  <p>gender: ${gender}</p>
  <p>status: ${status}</p>
<img src = "${image}" alt ="${name}"/>
`;
}
