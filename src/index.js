import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('[id="search-box"]');
const listOfCountryData = document.querySelector('.country-info');
const listOfCountryName = document.querySelector('.country-list');

listOfCountryName.style.paddingLeft = 0;
listOfCountryName.style.margin = 0;
listOfCountryData.style.margin = 0;
inputEl.style.margin = 0;

inputEl.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(event) {
  const searchCountryName = event.target.value.trim();

  if (!searchCountryName) {
    listOfCountryName.innerHTML = '';
    listOfCountryData.innerHTML = '';
    return;
  }

  fetchCountries(searchCountryName)
    .then(countries => {
      onFetchErrorLength(countries);
    })
    .catch(error => {
      onFetchError(error);
    });
}

function createOneCountryMarkup(countries) {
  listOfCountryName.innerHTML = '';
  const markupNameOfCountry = countries
    .map(country => {
      return `<div style = "display: flex; align-items: center"><img src = ${
        country.flags.svg
      } style = "width: 40px; max-height: 30px; margin-right: 10px"><h1>${
        country.name.common
      }</h1></div>
      <p><b>Capital:</b> ${country.capital}</p>
      <p><b>Population:</b> ${country.population}</p>
      <p><b>Languages:</b> ${Object.values(country.languages)}</p>`;
    })
    .join('');
  listOfCountryData.innerHTML = markupNameOfCountry;
}

function createListCountryMarkup(countries) {
  listOfCountryData.innerHTML = '';
  const markupNameOfCountry = countries
    .map(country => {
      return `<li style = "display: flex; align-items: center"><img src = ${country.flags.svg} style = "width: 40px; max-height: 30px; margin-right: 10px"><p>${country.name.common}</p></li>`;
    })
    .join('');
  listOfCountryName.innerHTML = markupNameOfCountry;
}

function onFetchErrorLength(countries) {
  if (countries.length > 10) {
    listOfCountryName.innerHTML = '';
    Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length > 2 && countries.length < 10) {
    createListCountryMarkup(countries);
  } else if (countries.length === 1) {
    createOneCountryMarkup(countries);
  }
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
}
