const PersonForm = ({ newName, newNumber, handleAddName, handleNewNumber, handleAddPerson }) => {


  return (
    <form >
      <div style={{ "display": "flex", "flexDirection": "column", "rowGap": "10px", "maxWidth": "50%", "minWidth": "45%" }}>
        name: <input value={newName} onChange={handleAddName} />
        <br />
        number: <input onKeyPress={(event) => {
          if (!/[0-9-]/.test(event.key)) {
            event.preventDefault();
          }
        }} value={newNumber} onChange={handleNewNumber} />
      </div>
      <div style={{ "marginTop": "10px" }}>
        <button onClick={handleAddPerson} type="submit">Add contact!</button>
      </div>
    </form>
  );
};

export default PersonForm;