import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({ filteredCountries }) => {
  const style = {
    "backgroundColor": "rgba(238, 238, 238, 0.8)",
    "padding": "10px",
    "borderRadius": "5px",
    "marginBottom": "10px"

  };

  const singleCountry = (arr) => {
    return arr.map(country => {
      const name = country.name.common;
      const capital = country.capital;
      const id = country.ccn3;
      const area = country.area;
      const flag = country.flags.png;
      const alt = country.flag.alt;
      let languages = [];
      if (country.languages) {
        // eslint-disable-next-line
        for (const [_, value] of Object.entries(country.languages)) {
          languages.push(value);
        }
      }

      const renderLang = languages.map(lang => {
        return (
          <li key={lang}>{lang}</li>
        );
      });
      // const { firstLang, secondLang } = country.languages;
      return (
        <div key={id} style={{ "margin": "10px" }}>
          <div style={style}>
            <h2>{name}</h2>
            <p>Capital: {capital}</p>
            <p>Area: {area} Km.</p>
            <p>Languages:</p><ul>{renderLang}</ul>
            <img src={flag} alt={alt} />
          </div>
          <WeatherInfo capital={capital} />
        </div>
      );
    });
  };
  let content;
  if (filteredCountries.length === 1) {
    content = singleCountry(filteredCountries);
  }

  return (
    <>
      {content}
    </>
  );
};

export default CountryInfo;