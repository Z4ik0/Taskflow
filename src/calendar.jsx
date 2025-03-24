import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";

function TaskCalendar() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [asunts, setAsunts] = useState({});

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    const storedAsunts = JSON.parse(localStorage.getItem("asunts")) || {};
    setTasks(storedTasks);
    setAsunts(storedAsunts);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("asunts", JSON.stringify(asunts));
  }, [asunts]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const addTask = () => {
    const taskText = prompt("Escribe tu tarea:");
    if (taskText) {
      setTasks((prevTasks) => {
        const newTasks = {
          ...prevTasks,
          [date.toDateString()]: [...(prevTasks[date.toDateString()] || []), taskText],
        };
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        return newTasks;
      });
    }
  };

  const addAsunt = () => {
    const asuntText = prompt("Escribe el Asunto:");
    if (asuntText) {
      setAsunts((prevAsunts) => {
        const newAsunts = {
          ...prevAsunts,
          [date.toDateString()]: [...(prevAsunts[date.toDateString()] || []), asuntText],
        };
        localStorage.setItem("asunts", JSON.stringify(newAsunts));
        return newAsunts;
      });
    }
  };

  const removeTask = (taskToRemove) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks[date.toDateString()].filter((task) => task !== taskToRemove);
      const newTasks = { ...prevTasks };
      if (updatedTasks.length === 0) {
        delete newTasks[date.toDateString()];
      } else {
        newTasks[date.toDateString()] = updatedTasks;
      }
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  };
 
  const removeAsunt = (asuntToRemove) => {
    setAsunts((prevAsunts) => {
      const updatedAsunts = prevAsunts[date.toDateString()].filter((asunt) => asunt !== asuntToRemove);
      const newAsunts = { ...prevAsunts };
      if (updatedAsunts.length === 0) {
        delete newAsunts[date.toDateString()];
      } else {
        newAsunts[date.toDateString()] = updatedAsunts;
      }
      localStorage.setItem("asunts", JSON.stringify(newAsunts));
      return newAsunts;
    });
  };

  const tileClassName = ({ date }) => {
    return tasks[date.toDateString()] ? "has-task" : "";
  };

  return (
    <div className="calendar-container">
      <h2>Calendario</h2>
      
      <div className="calendar-and-tasks">
        
        <div className="calendar">
          <Calendar
            onChange={handleDateChange}
            value={date}
            locale="es-ES"
            tileClassName={tileClassName}
          />
        </div>

        
        <div className="tasks">
          <h3>Tareas para: {date.toLocaleDateString("es-ES", )}</h3>
          
          <div>
            {tasks[date.toDateString()]?.length ? (
              <ul>
                {tasks[date.toDateString()].map((task, index) => (
                  <li key={index}>
                    {task}
                    <button className="delete-btn" onClick={() => removeTask(task)}>Eliminar</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay tareas para este día.</p>
            )}
          </div>

          <h3>Asuntos:</h3>
          <div>
            {asunts[date.toDateString()]?.length ? (
              <ul>
                {asunts[date.toDateString()].map((asunt, index) => (
                  <li key={index}>
                    {asunt}
                    <button className="delete-btn" onClick={() => removeAsunt(asunt)}>Eliminar</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay asuntos para esta fecha.</p>
            )}
          </div>

          <button className="add-btn" onClick={addTask}>➕ Agregar Tarea</button>
          <button className="add-btn" onClick={addAsunt}>📄 Agregar Asunto</button>
        </div>
      </div>
    </div>
  );
}

export default TaskCalendar;
