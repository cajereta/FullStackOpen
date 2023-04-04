import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const getName = (cityName) => {
  return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`);
};

const findByName = (arr, countryName) => {


  const country = arr.find((a) => a.name.common === countryName);
  if (country) {
    const name = country.name.common;
    const capital = country.capital;
    const id = country.cca3;
    const area = country.area;
    const flag = country.flags.png;
    const alt = country.flag.alt;
    let languages = [];
    if (country.languages) {
      for (const [_, value] of Object.entries(country.languages)) {
        languages.push(value);
      }
    }

    if (name) {
      getName(capital)
        .then(response => {
        });
    }


    const renderLang = languages.map(lang => {
      return (
        <li key={lang}>{lang}</li>
      );
    });
    // const { firstLang, secondLang } = country.languages;
    return (
      <div key={id}>
        <div >
          <h2>{name}</h2>
          <p>Capital: {capital}</p>
          <p>Area: {area} Km.</p>
          <p>Languages:</p><ul>{renderLang}</ul>
          <img src={flag} alt={alt} />
        </div>
      </div>
    );
  }

};

export default findByName;