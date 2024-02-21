const Person = ({ person }) => {
  return (
    <li key={person.name}>
      {person.name} {person.number}
    </li>
  );
};

const Persons = ({ persons, filterName }) => {
  return (
    <div>
      <ul>
        {persons
          .filter((person) => {
            return filterName
              ? person.name.toLowerCase().includes(filterName.toLowerCase())
              : person;
          })
          .map((person) => (
            <Person key={person.name} person={person} />
          ))}
      </ul>
    </div>
  );
};

export default Persons;
