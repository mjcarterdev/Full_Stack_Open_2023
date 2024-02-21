import peopleService from '../services/peopleService';

const Person = ({ person, setMessage }) => {
  const handleOnDelete = () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      peopleService
        .remove(person.id)
        .then(() => {
          setMessage({
            message: `Deleted ${person.name}`,
            type: 'success',
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage({
            message: `Information of ${person.name} has already been removed from the server`,
            type: 'error',
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
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

const Persons = ({ persons, filterName, setMessage }) => {
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
            <Person key={person.name} person={person} setMessage={setMessage} />
          ))}
      </ul>
    </div>
  );
};

export default Persons;
