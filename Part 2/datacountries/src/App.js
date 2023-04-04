import axios from "axios";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";

const baseUrl = `https://restcountries.com/v3.1/all`;


function App() {

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAll = () => {
    return axios.get(baseUrl);
  };

  useEffect(() => {
    getAll()
      .then(response => {
        setTimeout(() => {
          setCountries(response.data);
        }, 1000);
      });

  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLocaleLowerCase()));



  return (
    <div >
      Find countries <input onChange={handleChange} />
      <div style={{ marginTop: "60px" }}>
        <CountryList filteredCountries={filteredCountries} />
      </div>
    </div>
  );
}

export default App;
