// TODO 6.19-6.21 Reformat to old style connect()
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import Filter from "./components/Filter";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {initializeAnedotes} from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnedotes());
  }, [dispatch])
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App