import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = event => {
    console.log(event.target.value);
    dispatch(filterChange(event.target.value));
  };
  const style = {
    marginBottom: 10
  };
  return (
    <div style={style}>
      Filter <input name="filter" onChange={handleChange}></input>
    </div>
  );
};

export default Filter;