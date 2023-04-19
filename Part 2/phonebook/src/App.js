import { useState, useEffect } from 'react';
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState("red");


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();

    function check(arr, name, number) {
      if (!newName || !newNumber) {
        alert("Name and number must not be empty!");
        return;
      }

      const foundName = arr.some(el => el.name === name);
      const foundNumber = arr.some(el => el.number === number);
      if (!foundName && !foundNumber) {
        const personObject = {
          name,
          number,

        };
        // Server
        personService
          .create(personObject)
          .then(() => {
            setMessage(`${name} was addded to the list.`);
            setTypeMessage("green");
            setTimeout(() => {
              setMessage(null);
            }, 3000);

            setPersons([...persons, personObject]);
          }
          )
          .catch(error => {
            console.log(error.response.data.error);
            setTypeMessage("red");
            setMessage(`Name and number must be at least 3 characters long!`);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });

        setNewName("");
        setNewNumber("");

      } else if (foundName) {
        if (window.confirm(`${name} is already added to the phonebook, replace the old number with a new one?`)) {
          const { id } = persons.find((el) => el.name === name);
          const personObject = {
            name,
            number
          };

          personService
            .updatePerson(id, personObject)
            .then((response) => {
              setPersons(persons.map(n => n.id !== id ? n : response.data));
              setMessage(`${name} number was updated!`);
              setTypeMessage("green");
              setTimeout(() => {
                setMessage(null);
              }, 3000);
            }
            );
          setNewName("");
          setNewNumber("");
        }
      } else if (foundNumber) {
        alert(`Number ${number} alreary exists in the phonebook`);
      }
    }

    check(persons, newName, newNumber);
  };
  const handleAddName = event => {
    setNewName(event.target.value);

  };

  const handleNewNumber = event => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };



  const handleDelete = (event) => {
    console.log(event.target);
    const targetId = event.target.id;
    const { name } = persons.find(({ id }) => id === targetId);
    const deletedPerson = persons.filter(person => person.id !== targetId);

    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .deletePerson(targetId)
        .then(() => {
          setPersons([...deletedPerson]);
          setMessage(`${name} was deleted!!`);
          setTypeMessage("red");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        }).catch(error => {
          setMessage(`There was an error! Please try again`);
          setTypeMessage("red");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };

  const filteredContacts = filter ? persons.filter((el) => el.name.toLowerCase().includes(filter.toLowerCase())) : persons;


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Notification message={message} type={typeMessage} />
      <h2>Add a new contact</h2>

      <PersonForm
        newName={newName}
        handleAddName={handleAddName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        handleAddPerson={handleAddPerson}

      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filteredContacts={filteredContacts}
        handleDelete={handleDelete}
      />

    </div>
  );
};

export default App;