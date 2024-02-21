import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import peopleService from './services/peopleService.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

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

    peopleService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
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
      <Persons persons={persons} filterName={filterName} />
    </div>
  );
};

export default App;
