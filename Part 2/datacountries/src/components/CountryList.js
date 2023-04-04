import { useState } from "react";
import findByName from "../utils/findByName";
import CountryInfo from "./CountryInfo";
import CountryItem from "./CountryItem";

const CountryList = ({ filteredCountries }) => {
  const [show, setShow] = useState(false);
  const [idName, setIdName] = useState("");


  const handleShowClick = (event) => {
    const id = event.target.id;
    setShow(!show);
    setIdName(id);

  };

  let content = findByName(filteredCountries, idName);

  const renderMultipleCountries = filteredCountries.map(country => {
    const name = country.name.common;
    return (
      <CountryItem key={name} name={name} filteredCountries={filteredCountries} handleShowClick={handleShowClick} />
    );
  });

  //Render on screen
  // const renderIf = filteredCountries.length === 1 ? countryAlone : "";
  const notInitialized = (filteredCountries.length === 250) ? "Type to search for a country" : "";
  const tooMany = (filteredCountries.length > 9 && filteredCountries.length < 240) ? "There are too many matches, be more specific!" : "";
  const listResults = (filteredCountries.length < 9 && filteredCountries.length > 1) ? renderMultipleCountries : "";
  const clicked = show ? content : "";
  return (
    <>
      {notInitialized}
      {listResults}
      {clicked}
      {tooMany}
      <CountryInfo filteredCountries={filteredCountries} />

    </>
  );
};

export default CountryList;

// {country.capital.length > 1 ? `${country.capital[0]} and ${country.capital[1]}` : `${country.capital[0]}`}