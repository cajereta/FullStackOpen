import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotificationWithTimer } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === "") {
      return [...state.anecdotes];
    }
    return state.anecdotes
      .filter(anec => anec.content
        .toLowerCase()
        .includes(state.filter.toLowerCase()));
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(addVote(anecdote));
    dispatch(setNotificationWithTimer(`You voted "${anecdote.content}". `, 5));

  };

  return (
    <div>
      {anecdotes.sort((a, b) => {
        return b.votes - a.votes;
      }).map(anecdote =>
        <div key={anecdote.id}>
          <div >
            {anecdote.content}

          </div>
          <div style={{ marginBottom: "10px" }}>
            has {anecdote.votes}

            <button onClick={() => vote(anecdote)}>vote</button>
          </div >
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;