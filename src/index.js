import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';


const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
// const URL = 'https://restcountries.com/v3.1/';

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  clearScreen();  
  const inputedName = event.target.value.trim();
  
  if (inputedName.length === 0) {
    // console.log('Empty');
    return;
  }

  fetchCountries(inputedName)
    .then(data => {
      // console.log(data);
      if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }
      if (data.length === 1) {
        createCountryCard(data);
        return;
      }      
      createCountryList(data);   
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });      
}

// function fetchCountries(inputedName) {
//   return fetch(`${URL}name/${inputedName}?fields=name,capital,population,flags,languages`)
//          .then(response => response.json());
// }

function createCountryCard(data) {
  const ListOfCountries = data.map(element => {
    return `
            <div class="country-card-header">
            <img src="${element.flags.svg}" width="30" max height="25"/>
            <h1 >${element.name.common}</h1>
            </div>
            <p class="country-card-body">Capital: ${element.capital}</p>
            <p class="country-card-body">Population: ${element.population}</p>
            <p class="country-card-body">Languages: ${Object.values(element.languages).join(', ')}</p>            
            `;    
  });
  
  countryInfoEl.innerHTML = ListOfCountries.join('');  
}

function createCountryList(data) {
  const ListOfCountries = data.map(element => {
    return `<li class="country-item">
            <img src="${element.flags.svg}" width="30" max height="25"/>
            <p class="country-name">${element.name.common}</p>
            </li>`;        
  });

  countryListEl.innerHTML = ListOfCountries.join('');
}

function clearScreen() {
  countryInfoEl.innerHTML = '';
  countryListEl.innerHTML = '';  
}