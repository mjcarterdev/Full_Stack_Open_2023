import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import peopleService from './services/peopleService.jsx';
import Notification from './components/Notification.jsx';
import './app.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    peopleService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, [persons]);

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === '' || newNumber === '') {
      return;
    }

    if (persons.some((person) => person.name === newName)) {
      const person = persons.find((person) => person.name === newName);
      if (
        window.confirm(
          `${person.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...person, number: newNumber };
        peopleService
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setMessage({
              message: `Information of ${person.name} has been updated.`,
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
      setNewName('');
      setNewNumber('');
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    peopleService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage({
          message: `Added ${returnedPerson.name}`,
          type: 'success',
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMessage({
          message: error.response.data.error,
          type: 'error',
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    setNewName('');
    setNewNumber('');
  };

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message && (
        <Notification message={message.message} type={message.type} />
      )}
      <Filter filter={filterName} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameInputChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberInputChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterName={filterName}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
