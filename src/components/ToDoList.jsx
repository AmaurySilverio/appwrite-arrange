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
    const toDoObject = {
      title: newItem.trim(),
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

  const handleValueChange = (e) => {
    setNewItem(e.target.value);
  };

  return (
    <>
      <div className="to-do-list-container">
        <form onSubmit={addToDo} className="to-do-form">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            name="item"
            id="item"
            value={newItem}
            onChange={handleValueChange}
          />
          <Button type="submit">Add</Button>
        </form>
        <div className="to-do-list-items">
          <h3>To Do List</h3>
          <ul className="list">
            {toDoItems.map((item) => (
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
                  className="icon-border fa-solid fa-trash"
                  style={{ color: "#7d7d7d" }}
                  // onClick={(e) => {
                  //   removeContact(contact.$id);
                  //   e.stopPropagation();
                  // }}
                ></i>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Notification
        openModal={modal}
        closeModal={() => setModal(false)}
        message={errorMessage}
      />
    </>
  );
};

export default ToDoList;
