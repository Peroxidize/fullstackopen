import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [newFilter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
      .catch(error => console.log(error));
  }, []);

  const onDeletePerson = person => {
    if (!window.confirm(`Delete ${person.name} ?`)) {
      return;
    }

    personService
      .deletePerson(person.id)
      .then(response => {
        console.log(response.data);

        personService
          .getAll()
          .then(response => setPersons(response.data))
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  const handleFilterInputChange = event => {
    setFilter(event.target.value);
  };

  const handleNameInputChange = event => {
    setName(event.target.value);
  };

  const handleNumberInputChange = event => {
    setNumber(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();

    if (newNumber === "") {
      alert(`Number should not be empty`);
      return;
    }

    const found = persons.find(person => person.name === newName.trim());
    const alertText = `${found.name} is already added to the phonebook, replace the old number with a new one?`;

    if (found !== undefined && window.confirm(alertText)) {
      const updatePerson = {
        name: found.name,
        number: newNumber.trim(),
        id: found.id,
      };

      personService
        .updatePerson(updatePerson)
        .then(response => {
          console.log(response.data);

          personService
            .getAll()
            .then(response => setPersons(response.data))
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

      return;
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: persons.length + 1,
    };

    personService
      .create(newPerson)
      .then(response => console.log(response.data))
      .catch(error => {
        console.log(error);
        return;
      });

    setPersons(persons.concat(newPerson));
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Filter
        newFilter={newFilter}
        handleFilterInputChange={handleFilterInputChange}
      />
      <h1>add new</h1>
      <PersonForm
        onSubmit={onSubmit}
        newNumber={newNumber}
        newName={newName}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        newFilter={newFilter}
        onDeletePerson={onDeletePerson}
      />
    </>
  );
};

export default App;
