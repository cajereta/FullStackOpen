import { useEffect } from 'react';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import NewAnecdote from './components/AnedoteForm';
import Notification from './components/Notification';
import { initalizeAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initalizeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />

      <NewAnecdote />
    </div>
  );
};

export default App;