const Persons = ({ persons, newFilter }) => {
  return (
    <>
      {persons.map(person => {
        const name = person.name.toLowerCase();

        if (newFilter && !name.includes(newFilter.toLowerCase())) {
          return null;
        }

        return <div key={person.id}>{person.name} {person.number}</div>;
      }
      )}
    </>
  );
}

export default Persons;
