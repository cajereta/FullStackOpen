import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient, } from 'react-query';

import { useNotificationDispatch } from './NotificationContext';
import { getAnecdotes, addVote } from "./services/requests";



const App = () => {
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const addVoteMutation = useMutation(addVote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    }
  });

  const result = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false
  });

  const handleVote = (anecdote) => {
    addVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 },
      {
        onSuccess: () => {
          dispatch({ type: "SET_NOTIFICATION", data: `You've voted "${anecdote.content}"` });
          setTimeout(() => {
            dispatch({ type: "REMOVE" });
          }, 5000);
        }
      });

  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  const anecdotes = result.data;
  if (anecdotes === undefined) {
    return <div>Service not available due to problems with the server.</div>;
  }

  return (
    <div >
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
