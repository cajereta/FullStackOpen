

const CountryItem = ({ name, handleShowClick }) => {

  return (
    <div>
      <p>{name} <button id={name} onClick={handleShowClick}>Show</button></p>
    </div >
  );
};


export default CountryItem;