import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad, total, average, positive }) => {

  console.log(good, neutral, bad, total, average, positive);

  if (!total) {
    return (
      <p>"No feedback given yet"</p>

    );
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text={"Number of good votes: "} value={good} />
          <StatisticLine text={"Number of neutral votes: "} value={neutral} />
          <StatisticLine text={"Number of bad votes: "} value={bad} />
          <StatisticLine text={"Total number of votes: "} value={total} />
          <StatisticLine text={"Average: "} value={average} />
          <StatisticLine text={"Positive: "} value={positive} text2="%" />
        </tbody>
      </table>
    );


  };
};
export default Statistics;