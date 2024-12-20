import { useEffect, useState } from "react";
import "./App.css";
import 'remixicon/fonts/remixicon.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const localTodos = localStorage.getItem("todos")
    return localTodos ? JSON.parse(localTodos) : []
  });

  const showCustomToast = (id) => {
    const handleDelete = (id) => {
      const newTodos = todos;
      const filteredTodos = newTodos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
      toast.dismiss(id);
      window.location.reload();
    };

    const handleClose = (id) => {
      toast.dismiss(id);
      window.location.reload();
    };

    toast(
      <div>
        <p>Are you sure you want to delete this item?</p>
        <button onClick={() => handleDelete(id)} style={{ marginRight: "8px" }}>
          Delete
        </button>
        <button onClick={() => handleClose(id)}>Close</button>
      </div>
    );
  };

  useEffect(() => {
    if (todos) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [completedTodos, setCompletedTodos] = useState(() => {
    const completedTodos = localStorage.getItem("completedTodos")
    return completedTodos ? JSON.parse(completedTodos) : []
  });

  useEffect(() => {
    if (completedTodos) {
      localStorage.setItem("completedTodos", JSON.stringify(completedTodos))
    }
  }, [completedTodos])

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
    const completedOn = day + '-' + parseInt(month + 1) + '-' + year + ' at ' + hour + ':' + min + ':' + sec;

    const completed = {
      id: filteredItem[0].id,
      title: filteredItem[0].title,
      description: filteredItem[0].description,
      completedOn
    }
    window.location.reload();
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
        <TodoInput setTodos={setTodos} todos={todos} title={title} setTitle={setTitle} description={description} setDescription={setDescription} />
        <ToggleButton todos={todos} completed={completedTodos} isCompleteScreen={isCompleteScreen} setIsCompleteScreen={setIsCompleteScreen} />
        <TodoList notify={showCustomToast} completedTodos={completedTodos} isCompleteScreen={isCompleteScreen} todos={todos} onComplete={handleComplete} onRemoveTodo={handleRemoveTodo} onRemoveFromCompleted={handleRemoveFromCompleted} />
      </div>
    </div>
  );
}

function Title() {
  return <h1>My Todos</h1>
}

function TodoInput({ title, description, setTodos, setTitle, setDescription }) {

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      description
    }
    setTodos((todos) => [...todos, newTodo]);
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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
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
        isCompleteScreen === false ? <p>You have {todos.length} {todos.length === 0 || todos.length === 1 ? 'task to complete' : 'tasks to complete'}</p> : <p> You have completed {completed.length} {completed.length === 1 || completed.length === 0 ? 'task' : 'tasks'} </p>
      }
    </div>
  )
}

function TodoList({ notify, isCompleteScreen, todos, onRemoveTodo, onComplete, completedTodos, onRemoveFromCompleted }) {
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
                <button className="separate" title="Delete this todo" onClick={() => notify(todo.id)}><i className="ri-delete-bin-5-line ri-2x"></i></button>
                <button title="Mark as complete" onClick={() => onComplete(todo.id)}><i className="ri-check-double-line ri-2x"></i></button>
                <ToastContainer
                  autoClose={3000}
                  pauseOnHover
                  draggable
                  toastStyle={{
                    color: 'black',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                  }}
                ></ToastContainer>
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
                <button className="separate" onClick={() => onRemoveFromCompleted(todo.id)}><i className="ri-delete-bin-5-line ri-2x"></i></button>
              </div>
            </div>
          );
        })}
    </div>
  )
}
export default App;