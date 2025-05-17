import React, { useState, useEffect } from "react";

export const App = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [user, setUser] = useState("luismeneses");

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/users/${user}`
      );
      const userData = await response.json();
      setUserTasks(userData.todos);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [user]);

  const addTask = async (task) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${user}`,
        {
          method: "POST",
          body: JSON.stringify({ label: task, is_done: false }),
          headers: { "Content-Type": "application/json" },
        }
      );
      await response.json();
      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask(newTask);
    }
  };

  return (
    <div>
      <h1>TODO List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Agregar tarea"
        onKeyDown={handleKeyDown}
      />
      <ul>
        {userTasks.map((task) => (
          <li key={task.id}>
            {task.label}
            <button onClick={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
