import "./styles/to-do.css";
import { useState } from "react";
import Swal from "sweetalert2";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No puedes agregar una tarea vacía",
        confirmButtonText: "Aceptar",
      });

      setInputValue("");
    } else {
      setTasks([...tasks, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleDeleteAllTasks = () => {
    if (tasks.length > 0) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás recuperar las tareas eliminadas",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, borrar todo",
      }).then((result) => {
        if (result.isConfirmed) {
          setTasks([]);
          Swal.fire({
              title: "Eliminado",
              text: "Todas las tareas han sido eliminadas",
              timer: 1500,
              showConfirmButton: false,
              icon: "success",

          }

          );
        }
      });
    }
  };

  return (
    <div className="todo-list container">
      <h2>To-do</h2>
      <div className="todo_contenedor_input">
        <input
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Agrega una nueva tarea"
        />
        <button onClick={handleAddTask}>
          <i className="bi bi-patch-plus"></i>
        </button>
      </div>
      <ul className="todo-list-group">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index}>
              {task}
              <span onClick={handleDeleteTask.bind(null, index)}>
                <i className="bi bi-trash"></i>
              </span>
            </li>
          ))
        ) : (
          <p>No hay tareas pendientes</p>
        )}
      </ul>
      <div className="todo_footer">
        <span>You have pending tasks</span>
        <button onClick={handleDeleteAllTasks}>Borrar todo</button>
      </div>
    </div>
  );
};

export default ToDoList;
