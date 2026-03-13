import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [newFilter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data);
      });
  }, [])

  const handleFilterInputChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameInputChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNumber(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (newNumber === "") {
      alert(`Number should not be empty`);
      return;
    }

    const found = persons.find(person => person.name === newName.trim());

    if (found !== undefined) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newName.trim(), number: newNumber.trim(), id: persons.length + 1 }));
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterInputChange={handleFilterInputChange} />
      <h1>add new</h1>
      <PersonForm
        onSubmit={onSubmit}
        newNumber={newNumber}
        newName={newName}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </>
  );
}

export default App
