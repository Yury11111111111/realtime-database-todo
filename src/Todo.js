import React, { createContext, useContext, useEffect, useState } from "react";
import { Context } from "./index";
import DayJS from "react-dayjs";
import { ref, set, onValue, update, remove } from "firebase/database";
import { Button, Form } from "react-bootstrap";
import AddTodo from "./components/AddTodo";
import UpdateTodo from "./components/UpdateTodo";

export const ContextTodo = createContext();

const Todo = () => {
  const { database } = useContext(Context);
  const [todos, setTodos] = useState([]);

  const [addTodoShow, setAddTodoShow] = useState(false);
  const [uptateTodoShow, setUpdateTodoShow] = useState(false);
  const [previousTitle, setPreviousTitle] = useState("");

  function addTodo(title, body, endTime) {
    set(ref(database, "todo/" + title), {
      title: title,
      body: body,
      endTime: endTime,
      checked: false,
    });

    setTodos([]);

    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos([...Object.entries(todo)]);
        });
      }
    });
  }

  function toggleCheckbox(title, checked) {
    update(ref(database, "todo/" + title), {
      checked: !checked,
    });
  }

  function uptateTodo(updatedTitle, body, endTime) {
    update(ref(database, "todo/" + previousTitle), {
      title: updatedTitle,
      body: body,
      endTime: endTime,
    });

    setTodos([]);

    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos([...Object.entries(todo)]);
        });
      }
    });
  }

  function deleteTodo() {
    remove(ref(database, "todo/" + previousTitle));

    setTodos([]);

    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos([...Object.entries(todo)]);
        });
      }
    });
  }

  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos([...Object.entries(todo)]);
        });
      }
    });
  }, []);

  return (
    <ContextTodo.Provider
      value={{ addTodo, setAddTodoShow, uptateTodo, setUpdateTodoShow }}
    >
      <Button onClick={() => setAddTodoShow(true)}>Add Todo</Button>
      {todos.map((todo, i) => {
        return (
          <div key={i}>
            <Form.Check
              type={"checkbox"}
              checked={todo[1].checked}
              onChange={() => {
                toggleCheckbox(todo[0], todo[1].checked);
              }}
            />
            <Button
              onClick={() => {
                setPreviousTitle(todo[0]);
                setUpdateTodoShow(true);
              }}
            >
              Update Todo
            </Button>
            <Button
              onClick={() => {
                setPreviousTitle(todo[0]);
                deleteTodo();
              }}
            >
              Delete Todo
            </Button>
            {todo[1].checked === true ? (
              <s>
                <h3>{todo[1].title}</h3>
                <div>{todo[1].body}</div>
                <DayJS format="YYYY-MM-DD hh : mm : ss">
                  {todo[1].endTime}
                </DayJS>
              </s>
            ) : (
              <div>
                <h3>{todo[1].title}</h3>
                <div>{todo[1].body}</div>
                <DayJS format="YYYY-MM-DD hh : mm : ss">
                  {todo[1].endTime}
                </DayJS>
              </div>
            )}
          </div>
        );
      })}
      <AddTodo show={addTodoShow} onHide={() => setAddTodoShow(false)} />
      <UpdateTodo
        show={uptateTodoShow}
        onHide={() => setUpdateTodoShow(false)}
      />
    </ContextTodo.Provider>
  );
};

export default Todo;
