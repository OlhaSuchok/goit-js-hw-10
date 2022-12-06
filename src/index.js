import './css/styles.css';
var debounce = require('lodash.debounce');

// import { fetchCountries } from './fetchCountries';

const inputEl = document.querySelector('[id="search-box"]');
const listOfCountry = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

// inputEl.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));
inputEl.addEventListener('input', onCountrySearch);

function fetchCountryByName(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      return response.json();
    })
    .then(countries => {
      createListItemsMarkup(countries);

      //   const hhh = countries.map(country => {
      //     console.log(country);
      //     console.log(country.name.official);
      //   });
    })
    .catch(error => {
      console.log(error);
    });
}

function createListItemsMarkup(countries) {
  const markupNameOfCountry = countries
    .map(country => {
      return `<li style = "display: flex"><img src = ${country.flags.svg} style = "width: 30px; margin-right: 10px"><p>${country.name.official}</p></li>`;
    })
    .join('');
  listOfCountry.innerHTML = markupNameOfCountry;
}

function onCountrySearch(event) {
  const searchCountryName = event.currentTarget.value;
  console.log(searchCountryName);
  fetchCountryByName(searchCountryName);
}
