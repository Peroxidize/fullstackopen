import { useState, useEffect } from "react";
import countries from "../countries.json";
import Content from "./components/Content";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(countries);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [timeoutID, setTimeoutID] = useState();
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

  useEffect(() => {
    // axios
    //   .get(`${baseUrl}all`)
    //   .then(response => {
    //     console.log(response.data);
    //     setData(response.data);
    //   })
    //   .catch(error => console.log(error));
  }, []);

  const onChange = event => {
    const search = event.target.value;
    setSearch(search);

    clearTimeout(timeoutID);

    const handler = setTimeout(() => {
      const copy = data.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(copy);
    }, 250);

    setTimeoutID(handler);
  };

  return (
    <>
      <div>
        find countries <input value={search} onChange={onChange} />
      </div>

      {search === "" ? (
        <span />
      ) : filteredData.length === 1 ? (
        <>
          <h1>{filteredData[0].name.common}</h1>
          <div>Capital {filteredData[0].capital[0]}</div>
          <div>{filteredData[0].area}</div>
          <h2>Languages</h2>
          <ul>
            {Object.values(filteredData[0].languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={filteredData[0].flags.png} />
        </>
      ) : filteredData.length > 10 ? (
        <div>Too many matches, specify another field</div>
      ) : (
        filteredData.map(country => (
          <div key={country.name.official}>{country.name.common}</div>
        ))
      )}
    </>
  );
};

export default App;
