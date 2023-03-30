

const StatisticLine = ({ text, value, text2 }) => {

  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}{text2}
      </td>
    </tr>
  );
};

export default StatisticLine;