import { useState } from "react";
import "./App.css";
import 'remixicon/fonts/remixicon.css';
let todoList = [
  {
    id: crypto.randomUUID(),
    todo: "Finish homework"
  },
  {
    id: crypto.randomUUID(),
    todo: "Buy groceries"
  },
  {
    id: crypto.randomUUID(),
    todo: "Call mom"
  },
];

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [completedTodos, setCompletedTodos] = useState([]);

  const removeTodo = (id) => {
    const newTodos = todos;
    const filteredTodos = newTodos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  }

  const handleFromCompleted = (id) => {
    const newTodos = completedTodos;
    const filteredTodos = newTodos.filter((todo) => todo.id !== id);
    setCompletedTodos(filteredTodos);
  }

  const handleComplete = (id) => {
    const inCompleteTodos = todos;
    const filteredItem = inCompleteTodos.filter((todo) => todo.id === id);
    const completed = {
      id: filteredItem[0].id,
      todo: filteredItem[0].todo
    }
    console.log(filteredItem[0]);
    setCompletedTodos(() => [...completedTodos, completed]);
    removeTodo(id);
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput setTodos={setTodos} title={title} setTitle={setTitle} />
        <TodoList setTodos={setTodos} onFromCompletedTodos={handleFromCompleted} completedTodos={completedTodos} onComplete={handleComplete} todos={todos} onRemove={removeTodo} setIsCompleteScreen={setIsCompleteScreen} isCompleteScreen={isCompleteScreen} />
      </div>
    </div>
  );
};

function TodoInput({ title, setTitle, setTodos }) {

  function handleSubmit(e) {
    e.preventDefault();

    const todo = title;
    const newTodo1 = {
      id: crypto.randomUUID(),
      todo
    }
    setTodos((todos) => [...todos, newTodo1]);
    setTitle("");
  }

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="input-box-todo"
        placeholder="Title"
      />
      <input value={title} onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="input-box-todo"
        placeholder="Description"
      />
      {/* <button className="add-btn">+</button> */}
     <button><i className="ri-add-box-line ri-3x"></i></button>
    </form>
  );
}

function TodoList({ todos, onRemove, setIsCompleteScreen, isCompleteScreen, onComplete, completedTodos, onFromCompletedTodos }) {
  return (
    <div>
      <div className="btn-area">
        <button
          className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
          onClick={() => setIsCompleteScreen(false)}
        >
          Todo
        </button>
        <button
          className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
          onClick={() => setIsCompleteScreen(true)}
        >
          Completed
        </button>
      </div>
      <ul>
        {
          isCompleteScreen === false &&
          todos.map((todo, index) => (
            <li key={index} className="list-item">
              <p>{todo.todo}</p>
              <span className='icons'>
                {/* <button className="completed-btn" >Completed</button> */}
                <i className="ri-check-line" title="Mark as completed" onClick={() => onComplete(todo.id)}></i>
                <i className="ri-delete-bin-6-line" title="Remove this todo" onClick={() => onRemove(todo.id)}></i>
              </span>
            </li>))
        }
      </ul>
      <ul>
        {
          isCompleteScreen === true &&
          completedTodos.map((todo, index) => (
            <li key={index} className="list-item">
              <p>{todo.todo}</p>
              <span className='icons'>
                <i className="ri-delete-bin-6-line" title="Remove this todo" onClick={() => onFromCompletedTodos(todo.id)}></i>
              </span>
            </li>))
        }
      </ul>
    </div>
  )
}

export default App;