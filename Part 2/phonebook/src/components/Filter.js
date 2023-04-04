
const Filter = ({ filter, handleFilter }) => {

  return (
    <>
      Filter contacts <input value={filter} onChange={handleFilter} />
    </>
  );
};

export default Filter;