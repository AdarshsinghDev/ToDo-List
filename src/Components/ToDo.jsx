import React, { useState, useEffect } from "react";
import "./ToDo.css";
import TaskCard from "./TaskCard/TaskCard";

function ToDo() {
  const [slide, setSlide] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [time, setTime] = useState();
  const [behindMsg, setBehindMsg] = useState(
    "No tasks yet! Add something to do."
  );
  const [editedIndex, setEditedIndex] = useState(null);
  const [editText, setEditText] = useState(false);
  const [prevTaskLength, setPrevTaskLength] = useState(0);
  const [style, setStyle] = useState("hidden");
  const todoKey = "reactTodo";
  const [task, setTask] = useState(() => {
    const rawTodo = localStorage.getItem(todoKey);
    return rawTodo ? JSON.parse(rawTodo) : [];
  });

  const handleToggle = () => {
    document.body.classList.toggle("dark");

    setSlide(!slide);
  };

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
    if (inputValue === task.includes(inputValue)) {
      setStyle("warning");
    } else {
      setStyle("hidden");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) return;

    if (task.includes(inputValue)) {
      setStyle("warning");
      return;
    } else {
      setTask((prevState) => [...prevState, inputValue]);
      setPrevTaskLength(task.length);
      setInputValue("");
    }

    setTime(
      new Date().toLocaleTimeString("en-Us", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  const handleAdd = () => {
    setTask(task);
    setBehindMsg("");
  };

  const handleDelete = (index) => {
    setPrevTaskLength(task.length);
    setTask(task.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditText(true);
    setInputValue(task[index]);
    setEditedIndex(index);
  };

  const saveEdit = () => {
    if (!inputValue.trim() || editedIndex === null) return;

    const updatedTask = task.map((currentTask, index) =>
      index === editedIndex ? `${inputValue} : Edited` : currentTask
    );

    setTask(updatedTask);
    setEditedIndex(null);
    setEditText(false);
    setInputValue("");
  };

  useEffect(() => {
    if (task.length === 0) {
      const storedTasks = JSON.parse(localStorage.getItem(todoKey)) || [];
      if (storedTasks.length > 0) {
        setBehindMsg("Great job🔥 All tasks are done. Add new tasks now!");
      } else {
        setBehindMsg("No tasks yet! Add something to do.");
      }
    }
  }, [task, prevTaskLength]);

  useEffect(() => {
    localStorage.setItem(todoKey, JSON.stringify(task));
  }, [task]);

  return (
    <>
      <section className="main">
        <div className="mode">
          <div
            className={`mode-circle ${slide ? "" : "right"}`}
            onClick={handleToggle}
          ></div>
        </div>
        <header>
          <h1>Task List</h1>
        </header>
        <section className="main-form">
          <form onSubmit={handleFormSubmit}>
            <span className={style}>Already Existed!</span>
            <div className="form-inner">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputValue}
                placeholder="Type your Task..."
              />
              {editText ? (
                <button type="submit" className="btn" onClick={saveEdit}>
                  Save
                </button>
              ) : (
                <button type="submit" className="btn" onClick={handleAdd}>
                  Add
                </button>
              )}
            </div>
          </form>
        </section>
        <section className="task-list">
          <div className="task-list_container">
            {task.map((currentTask, index) => {
              return (
                <TaskCard
                  key={index}
                  taskText={currentTask}
                  addedTime={time}
                  delFunc={() => handleDelete(index)}
                  editFunc={() => handleEdit(index)}
                />
              );
            })}
          </div>
          <div className="behind-msg">{behindMsg}</div>
        </section>
      </section>
    </>
  );
}

export default ToDo;
