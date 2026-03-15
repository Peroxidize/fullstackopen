import { useState, useEffect } from "react";
import countries from "../countries.json";
import countriesService from "./services/countries";
import axios from "axios";

const CountriesList = ({ list, setSelected }) => {
  return list.map(country => {
    const name = country.name.common;

    return (
      <div key={name}>
        {name} <button onClick={() => setSelected(country)}>Show</button>
      </div>
    );
  });
};

const ShowCountry = ({ list, selected, setSelected }) => {
  const country = selected !== null ? selected : list;
  const name = country.name.common;
  const capital = country.capital;
  const area = country.area;
  const languages = Object.values(country.languages);
  const flag = country.flags.png;

  return (
    <>
      {selected ? (
        <button onClick={() => setSelected(null)}>Hide</button>
      ) : null}
      <h1>{name}</h1>
      <div>Capital {capital}</div>
      <div>Area {area}</div>
      <h2>Languages</h2>
      <ul>
        {languages.map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={flag} />
    </>
  );
};

const FilterContent = ({ list, selected, setSelected }) => {
  if (selected) {
    return <ShowCountry selected={selected} setSelected={setSelected} />;
  }

  if (list.length > 10) {
    return <div>Too many matches, specify another field</div>;
  }

  if (list.length > 1) {
    return <CountriesList list={list} setSelected={setSelected} />;
  }

  if (list.length === 1) {
    return (
      <ShowCountry list={list[0]} selected={null} setSelected={setSelected} />
    );
  }

  return <span></span>;
};

const App = () => {
  const [data, setData] = useState(countries);
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // countriesService.getAll
    //   .then(response => {
    //     console.log(response.data);
    //     setData(response.data);
    //   })
    //   .catch(error => console.log(error));
  }, []);

  const searchHandle = event => {
    const search = event.target.value;

    setSelected(null);

    if (search === "") {
      setFilteredData([]);
      return;
    }

    setFilteredData(
      data.filter(country => {
        const name = country.name.common.toLowerCase();
        return name.includes(search);
      })
    );
  };

  return (
    <>
      <div>
        find countries <input onChange={searchHandle} />
      </div>
      <FilterContent
        list={filteredData}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

export default App;
