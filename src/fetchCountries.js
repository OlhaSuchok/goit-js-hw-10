export function fetchCountryByName(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => response.json());
}

// const hhh = countries.map(country => {
//   console.log(country);
//   console.log(country.name.official);
// });
