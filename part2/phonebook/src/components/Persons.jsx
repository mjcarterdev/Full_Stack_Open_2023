import peopleService from '../services/peopleService';

const Person = ({ person }) => {
  const handleOnDelete = () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      peopleService.remove(person.id).then(() => {
        console.log(`Deleted ${person.name}`);
      });
    }
  };

  return (
    <li key={person.name}>
      {person.name} {person.number}
      <button onClick={handleOnDelete}>Delete</button>
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
