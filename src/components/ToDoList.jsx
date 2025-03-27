import { useState, useEffect } from "react";
import Button from "./Button";
import todoService from "../services/toDoList";
import Notification from "./Notification";
import { useAuth } from "../utils/AuthProvider";

const ToDoList = () => {
  const [newItem, setNewItem] = useState("");
  const [toDoItems, setToDoItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const user$id = user.$id;
    todoService
      .getAll(user$id)
      .then((initialToDoItems) => {
        setToDoItems(initialToDoItems);
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage(
          "There is a problem with the server. Please refresh the page"
        );
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        console.log(error);
      });
  }, []);

  const addToDo = (event) => {
    const user$id = user.$id;
    event.preventDefault();
    const trimmedItem = newItem.trim();

    if (!trimmedItem) {
      setModal(true);
      setErrorMessage("To Do item cannot be empty.");
      setTimeout(() => {
        setModal(false);
        setErrorMessage("");
      }, 5000);
      return;
    }
    const toDoObject = {
      title: trimmedItem,
      completed: false,
      createdBy: user$id,
    };
    if (
      toDoItems.find(
        (item) => item.title.toUpperCase() === toDoObject.title.toUpperCase()
      )
    ) {
      setModal(true);
      setErrorMessage(
        `'${toDoObject.title}' has already been already added to your To Do List.`
      );
      setTimeout(() => {
        setModal(false);
        setErrorMessage("");
      }, 5000);
      setNewItem("");
      return false;
    }

    todoService
      .create(toDoObject)
      .then((returnedtoDoList) => {
        setToDoItems(toDoItems.concat(returnedtoDoList));
        setNewItem("");
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage("To Do Item could not be added. Please try again.");
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        console.log(error);
      });
  };

  const toggleCompleted = ($id) => {
    const item = toDoItems.find((i) => i.$id === $id);
    const changedItem = { ...item, completed: !item.completed };
    const completedOject = { completed: changedItem.completed };
    todoService
      .update($id, completedOject)
      .then((returnedItem) => {
        setToDoItems(toDoItems.map((i) => (i.$id === $id ? returnedItem : i)));
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage(`'${item.title}' was already deleted from the server.`);
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        setToDoItems(toDoItems.filter((i) => i.$id !== $id));
      });
  };

  const removeToDoItem = ($id) => {
    todoService
      .remove($id)
      .then(() => {
        setToDoItems(toDoItems.filter((i) => i.$id !== $id));
      })
      .catch((error) => {
        setModal(true);
        setErrorMessage("To Do Item was already deleted from the server.");
        setTimeout(() => {
          setModal(false);
          setErrorMessage("");
        }, 5000);
        setToDoItems(toDoItems.filter((i) => i.$id !== $id));
      });
  };

  const handleValueChange = (e) => {
    setNewItem(e.target.value);
  };

  return (
    <>
      <div className="to-do-list-title">
        Don't fall into your days like an accident! Create a To-Do List and
        tackle your job search tasks with confidence. ✅
      </div>
      <div className="to-do-list-container">
        <form onSubmit={addToDo} className="to-do-form">
          <label htmlFor="item">Item:</label>
          <input
            type="text"
            name="item"
            id="item"
            placeholder="Apply to NYT Job"
            value={newItem}
            onChange={handleValueChange}
          />
          <Button type="submit">Add</Button>
        </form>
        <div className="to-do-list-items">
          <h3>Today's To-Dos</h3>
          <ul className="list">
            {toDoItems.length < 1 ? (
              <h4>No To-Dos Found</h4>
            ) : (
              toDoItems.map((item) => (
                <li key={item.$id}>
                  <div className="item-container">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={(e) => toggleCompleted(item.$id)}
                    />
                    <label onClick={(e) => toggleCompleted(item.$id)}>
                      {item.title}
                    </label>
                  </div>
                  <i
                    className="icon-border fa-solid fa-trash lightIconColor"
                    onClick={(e) => {
                      removeToDoItem(item.$id);
                    }}
                  ></i>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <Notification
        openModal={modal}
        closeModal={() => setModal(false)}
        message={errorMessage}
        title="Network Error"
      />
    </>
  );
};

export default ToDoList;
