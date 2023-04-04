

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
  });
};

export default singleCountry;