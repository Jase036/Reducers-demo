import { useReducer } from "react";

const initialTodos = {
  list: [
    {
      id: "1",
      task: "Learn React Props",
      complete: false
    },
    {
      id: "2",
      task: "Learn React State",
      complete: false
    },
    {
      id: "3",
      task: "Learn React Effects",
      complete: false
    },
    {
      id: "4",
      task: "Learn React Context",
      complete: false
    }
  ],
  inputValue: ""
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "click-box":
      return {
        ...state,
        list: state.list.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, complete: !todo.complete };
          } else {
            return todo;
          }
        })
      };
    case "change-add-input":
      return { ...state, inputValue: action.value };
    case "click-add":
      let newList = state.list.concat({
        id: state.list.length + 1,
        task: state.inputValue,
        complete: false
      });
      return { list: newList, inputValue: "" };
    default:
      return state;
  }
};


const App = () => {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  // console.log(state);
  const handleChange = (todo) => {
    dispatch({
      type: "click-box",
      id: todo.id
    });
  };

  const handleAddChange = (ev) => {
    dispatch({
      type: "change-add-input",
      value: ev.target.value
    });
  };

  const handleAdd = (todo) => {
    dispatch({
      type: "click-add"
    });
  };

  return (
    <>
      <ul>
        {state.list.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChange(todo)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>
      <input type="text" value={state.inputValue} onChange={handleAddChange} />
      <button onClick={handleAdd}>Add task</button>
    </>
  );
};

export default App;
