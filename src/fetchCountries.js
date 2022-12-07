export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => response.json());
}

// import './css/styles.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { fetchCountries } from './fetchCountries';
// var debounce = require('lodash.debounce');
// listOfCountryName.style.paddingLeft = 0;

// const inputEl = document.querySelector('[id="search-box"]');
// const listOfCountryName = document.querySelector('.country-list');
// const listOfCountryData = document.querySelector('.country-info');
// const DEBOUNCE_DELAY = 300;

// inputEl.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

// function onCountrySearch(event) {
//   const searchCountryName = event.target.value.trim();

//   if (!searchCountryName) {
//     listOfCountryName.innerHTML = '';
//     listOfCountryData.innerHTML = '';
//     return;
//   }
//   console.log(searchCountryName);
//   console.dir(listOfCountryName.childNodes.length);

//   fetchCountries(searchCountryName)
//     .then(createListCountryMarkup)
//     .catch(onFetchError);
// }

// function createOneCountryMarkup(countries) {
//   listOfCountryName.innerHTML = '';
//   const markupNameOfCountry = countries
//     .map(country => {
//       return `<div style = "display: flex; align-items: center"><img src = ${
//         country.flags.svg
//       } style = "width: 40px; max-height: 30px; margin-right: 10px"><h1>${
//         country.name.common
//       }</h1></div>
//       <p><b>Capital:</b> ${country.capital}</p>
//       <p><b>Population:</b> ${country.population}</p>
//       <p><b>Languages:</b> ${Object.values(country.languages)}</p>`;
//     })
//     .join('');
//   listOfCountryData.innerHTML = markupNameOfCountry;
//   onFetchErrorLength(countries);
// }

// function createListCountryMarkup(countries) {
//   listOfCountryData.innerHTML = '';
//   const markupNameOfCountry = countries
//     .map(country => {
//       return `<li style = "display: flex; align-items: center"><img src = ${country.flags.svg} style = "width: 40px; max-height: 30px; margin-right: 10px"><p>${country.name.common}</p></li>`;
//     })
//     .join('');
//   listOfCountryName.innerHTML = markupNameOfCountry;
//   onFetchErrorLength(countries);
// }

// function onFetchErrorLength(countries) {
//   const lengthOfListCountry = listOfCountryName.childNodes.length;
//   if (lengthOfListCountry > 10) {
//     listOfCountryName.innerHTML = '';
//     Notify.warning(
//       'Too many matches found. Please enter a more specific name.'
//     );
//   } else if (lengthOfListCountry > 2 && lengthOfListCountry < 10) {
//     createListCountryMarkup(countries);
//   } else if (lengthOfListCountry === 1) {
//     createOneCountryMarkup(countries);
//   } else if (lengthOfListCountry === 0) {
//     onFetchError();
//   }
// }

// function onFetchError() {
//   Notify.failure('Oops, there is no country with that name');
// }
