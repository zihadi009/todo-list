import { useState } from "react";
import "./App.css";
import 'remixicon/fonts/remixicon.css';

let todoList = [
  {
    id: crypto.randomUUID(),
    title: "Weekly Grocery Shopping",
    description: "Create a list of essential groceries for the week. Check pantry and fridge, organize the list, and stick to it while shopping."
  },
  {
    id: crypto.randomUUID(),
    title: "Home Improvement Projects",
    description: "Compile a list of home improvement tasks. Prioritize and schedule repairs, maintenance, and upgrades for your living space."
  },
  {
    id: crypto.randomUUID(),
    title: "Professional Development Goals",
    description: "Document short-term and long-term professional development goals. Set milestones, research relevant opportunities, and track progress."
  },
];

function App() {
  const [todos, setTodos] = useState(todoList);
  console.log(todos)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleComplete = (id) => {
    const inCompleteTodos = todos;
    const filteredItem = inCompleteTodos.filter((todo) => todo.id === id);

    const now = new Date();
    const day = now.getDate()
    const month = now.getMonth();
    const year = now.getFullYear();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const completedOn =
      day + '-' + parseInt(month + 1) + '-' + year + ' at ' + hour + ':' + min + ':' + sec;
    const completed = {
      id: filteredItem[0].id,
      title: filteredItem[0].title,
      description: filteredItem[0].description,
      completedOn
    }
    setCompletedTodos(() => [...completedTodos, completed]);
    handleRemoveTodo(id);
  };

  const handleRemoveFromCompleted = (id) => {
    const newTodos = completedTodos;
    const filteredTodos = newTodos.filter((todo) => todo.id !== id);
    setCompletedTodos(filteredTodos);
  }
  const handleRemoveTodo = (id) => {
    const newTodos = todos;
    const filteredTodos = newTodos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  }

  return (
    <div className="App">
      <Title />
      <div className="todo-wrapper">
        <TodoInput setTodos={setTodos} title={title} setTitle={setTitle} description={description} setDescription={setDescription} />
        <ToggleButton todos={todos} completed={completedTodos} isCompleteScreen={isCompleteScreen} setIsCompleteScreen={setIsCompleteScreen} />
        <TodoList completedTodos={completedTodos} isCompleteScreen={isCompleteScreen} todos={todos} onRemoveTodo={handleRemoveTodo} onComplete={handleComplete} completedTodos={completedTodos} onRemoveFromCompleted={handleRemoveFromCompleted} />
      </div>
    </div>
  );
}

function Title() {
  return <h1>My Todos</h1>
}

function TodoInput({ title, description, setTodos, setTitle, setDescription }) {
  function handleSubmit(e) {
    // console.log(title, description)
    e.preventDefault();
    const newTodo1 = {
      id: crypto.randomUUID(),
      title,
      description
    }
    console.log(title, description)
    setTodos((todos) => [...todos, newTodo1]);

    setTitle("");
    setDescription("");
  }
  return (
    <form className="todo-input">
      <div className="todo-input-item">
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What's the task title?"
        />
      </div>
      <div className="todo-input-item">
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What's the task description?"
        />
      </div>
      <div className="todo-input-item">
       {title.length !== 0 && <button type="button" className="primaryBtn" onClick={handleSubmit}>Add</button>}
      </div>
    </form>
  )
}

function ToggleButton({ todos, isCompleteScreen, setIsCompleteScreen, completed }) {
  return (
    <div style={{display: "flex", alignItems:"center", justifyContent:"space-between", }}>
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
      {
      isCompleteScreen === false ? <p>You have {todos.length} {todos.length === 0 || todos.length === 1 ? 'task to complete' : 'tasks to complete'}</p> : <p> You have Completed {completed.length} {completed.length === 1 || completed.length === 0 ? 'task' : 'tasks'} </p>}
    </div>
  )
}

function TodoList({ isCompleteScreen, todos, onRemoveTodo, onComplete, completedTodos, onRemoveFromCompleted }) {
  return (
    <div className="todo-list">
      {isCompleteScreen === false &&
        todos.map((todo) => {
          return (
            <div className="todo-list-item" key={todo.id}>
              <div className="whole">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
              <div>
                <button className="separate" onClick={() => onRemoveTodo(todo.id)}><i class="ri-delete-bin-5-line ri-2x"></i></button>
                <button onClick={() => onComplete(todo.id)}><i class="ri-check-double-line ri-2x"></i></button>
              </div>
            </div>
          );
        })}

      {isCompleteScreen === true &&
        completedTodos.map((todo) => {
          return (
            <div className="todo-list-item" key={todo.id}>
              <div className="whole">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <small><p>Completed on: {todo.completedOn}</p></small>
              </div>

              <div>
                <button className="separate" onClick={() => onRemoveFromCompleted(todo.id)}><i class="ri-delete-bin-5-line ri-2x"></i></button>
              </div>
            </div>
          );
        })}
    </div>
  )
}
export default App;