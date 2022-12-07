import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');

const inputEl = document.querySelector('[id="search-box"]');
const listOfCountryName = document.querySelector('.country-list');
const listOfCountryData = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(event) {
  const searchCountryName = event.target.value.trim();

  if (!searchCountryName) {
    listOfCountryName.innerHTML = '';
    listOfCountryData.innerHTML = '';
  }
  console.log(searchCountryName);
  console.dir(listOfCountryName.childNodes.length);

  fetchCountries(searchCountryName)
    .then(createListCountryMarkup)
    .catch(onFetchError);
}

function createOneCountryMarkup(countries) {
  const markupNameOfCountry = countries
    .map(country => {
      return `<img src = ${country.flags.svg} style = "width: 30px; margin-right: 10px"><h1>${country.name.official}</h1>
      <p><b>Capital:</b> ${country.capital}</p>
      <p><b>Population:</b> ${country.population}</p>
      <p><b>Languages:</b> ${country.languages.swe}</p>`;
    })
    .join('');
  listOfCountryData.innerHTML = markupNameOfCountry;
  onFetchErrorLength(countries);
}

function createListCountryMarkup(countries) {
  const markupNameOfCountry = countries
    .map(country => {
      return `<li style = "display: flex"><img src = ${country.flags.svg} style = "width: 30px; margin-right: 10px"><p>${country.name.official}</p></li>`;
    })
    .join('');
  listOfCountryName.innerHTML = markupNameOfCountry;
  onFetchErrorLength(countries);
}

function onFetchErrorLength(countries) {
  const lengthOfListCountry = listOfCountryName.childNodes.length;
  if (lengthOfListCountry > 10) {
    Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (lengthOfListCountry > 2 && lengthOfListCountry < 10) {
    createListCountryMarkup(countries);
  } else if (lengthOfListCountry === 1) {
    listOfCountryName.innerHTML = '';
    createOneCountryMarkup(countries);
  } else if (lengthOfListCountry === 0) {
    onFetchError();
  }
}

function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
}
