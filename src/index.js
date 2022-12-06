import './css/styles.css';
var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountryByName } from './fetchCountries';

const inputEl = document.querySelector('[id="search-box"]');
const listOfCountry = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(event) {
  const searchCountryName = event.target.value;
  console.log(searchCountryName);

  fetchCountryByName(searchCountryName)
    .then(createListItemsMarkup)
    .catch(onFetchError);
}

function createListItemsMarkup(countries) {
  const markupNameOfCountry = countries
    .map(country => {
      return `<li style = "display: flex"><img src = ${country.flags.svg} style = "width: 30px; margin-right: 10px"><p>${country.name.official}</p></li>`;
    })
    .join('');
  listOfCountry.innerHTML = markupNameOfCountry;
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
}
