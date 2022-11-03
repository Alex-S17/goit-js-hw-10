const URL = 'https://restcountries.com/v3.1/';

export default function fetchCountries(inputedName) {
  return fetch(`${URL}name/${inputedName}?fields=name,capital,population,flags,languages`)
         .then(response => response.json());
}