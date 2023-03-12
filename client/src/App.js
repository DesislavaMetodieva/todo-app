import { useState, useEffect } from 'react';
import axios from 'axios';
import Todos from './components/Todos';
import Preloader from './components/Preloader';
import Header from './Header';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import './App.css';

function App() {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get('http://localhost:5001');
      setTodos(res.data);
    };
    getTodos();
  }, []);

  const createTodo = async (text) => {
    const res = await axios.post('http://localhost:5001', { message: text });
    setTodos(res.data);
  };

  const deleteTodo = async (id) => {
    const res = await axios.delete(`http://localhost:5001/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = async (id, message) => {
    const res = await axios.put(`http://localhost:5001/${id}`, { message });
    setTodos(res.data);
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <TodoInput createTodo={createTodo} />
        {todos ? (
          <Todos
            todos={todos}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ) : (
          <Preloader />
        )}
      </div>
    </div>
  );
}

export default App;
