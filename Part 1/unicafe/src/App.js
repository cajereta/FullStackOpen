import { useState } from 'react';
import Statistics from './components/Statistics';
import Button from './components/Button';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  const total = good + neutral + bad;
  const average = ((good - bad) / total).toFixed(3);
  const positive = ((good / total) * 100).toFixed(2);
  console.log(total);


  return (

    <>
      <h2>Give feedback</h2>
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />
      {/* <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button> */}
      <h2> Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </>

  );
};

export default App;