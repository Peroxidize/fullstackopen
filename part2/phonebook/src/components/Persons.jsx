const Persons = ({ persons, newFilter, onDeletePerson }) => {
  return (
    <>
      {persons.map(person => {
        const name = person.name.toLowerCase();

        if (newFilter && !name.includes(newFilter.toLowerCase())) {
          return null;
        }

        return (
          <div key={person.id}>
            {person.name} {person.number}&nbsp;
            <button onClick={() => onDeletePerson(person)}>delete</button>
          </div>
        );
      })}
    </>
  );
};

export default Persons;
