import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [newFilter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [css, setCss] = useState("");
  const [show, setShow] = useState("");

  const showMessage = (message, state) => {
    setMessage(message);
    setCss(state);
    setShow("show");
    setTimeout(() => setShow(""), 5000);
  };

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);

        const msg = `Unable to fetch data from the server`;
        showMessage(msg, "error");
      });
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
          .then(response => {
            setPersons(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);

            const msg = `Unable to fetch data from the server`;
            showMessage(msg, "error");
          });

        const msg = `Information of ${person.name} has been removed`;
        showMessage(msg, "success");
      })
      .catch(error => {
        console.log(error);

        const msg = `Information of ${person.name} has already been removed`;
        showMessage(msg, "error");
      });
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

    if (found !== undefined) {
      const alertText = `${found.name} is already added to the phonebook, replace the old number with a new one?`;
      if (window.confirm(alertText)) {
        const updatePerson = {
          name: found.name,
          number: newNumber.trim(),
          id: found.id,
        };

        personService
          .updatePerson(updatePerson)
          .then(response => {
            console.log(response.data);

            const copy = persons.map(person =>
              person.id === updatePerson.id ? updatePerson : person
            );
            setPersons(copy);

            const msg = `The number of ${updatePerson.name} has been successfully changed!`;
            showMessage(msg, "success");
          })
          .catch(error => {
            console.log(error);

            showMessage(error.response.data.error, "error");
          });
      }
      return;
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    personService
      .create(newPerson)
      .then(response => {
        console.log(response.data);
        showMessage(`Added ${newPerson.name}`, "success");
      })
      .catch(error => {
        const errorMsg = error.response.data.error;

        console.log(errorMsg);
        showMessage(errorMsg, "error");

        return;
      });

    personService
      .getAll()
      .then(response => {
        setPersons(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);

        const msg = `Unable to fetch data from the server`;
        showMessage(msg, "error");
      });
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} css={css} show={show} />
      <Filter
        newFilter={newFilter}
        handleFilterInputChange={handleFilterInputChange}
      />
      <h2>add new</h2>
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
