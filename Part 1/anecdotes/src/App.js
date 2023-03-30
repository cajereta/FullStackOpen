import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [voteIndex, setVoteIndex] = useState(0);


  const initialVotes = [0, 0, 0, 0, 0, 0, 0, 0];
  const [votes, setVotes] = useState(initialVotes);



  const handleRandom = () => {
    const randomI = Math.trunc(Math.random() * 7 + 1);
    setSelected(randomI);
    setVoteIndex(randomI);
  };

  const handleVote = () => {
    let copy = votes.map((vote, index) => {
      if (index === voteIndex) {
        return vote + 1;
      } else {
        return vote;
      }
    });

    setVotes(copy);
  };
  const maxAnecdote = votes.indexOf(Math.max(...votes));
  const maxVotes = Math.max(...votes);

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <button onClick={handleRandom} >Next Anecdote</button>
      <button onClick={handleVote}>Vote!</button>
      <p>Number of votes! : {votes[voteIndex]}</p>
      <br />
      <h2>Anecdote with most votes</h2>
      {maxVotes === 0 ? "Theres no favorite anecdote yet!" : <p>{anecdotes[maxAnecdote]}</p>}
      {maxVotes === 0 ? "" : <p>This anecdote has {maxVotes} votes!</p>}

    </div>
  );
};

export default App;