
const Persons = ({ filteredContacts, handleDelete }) => {

  const renderedNames = filteredContacts.map(person => {
    return (

      <p key={person.name}>
        {person.name} {person.number} -{"   "}
        <button id={person.id} onClick={handleDelete}>Delete</button>
      </p>

    );
  });
  return (
    <>
      {renderedNames}
    </>
  );
};

export default Persons;