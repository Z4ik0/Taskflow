import React, { useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";

function TaskCalendar() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({});

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  // Agregar una tarea 
  const addTask = () => {
    const taskText = prompt("Escribe tu tarea:");
    if (taskText) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [date.toDateString()]: [
          ...(prevTasks[date.toDateString()] || []),
          taskText,
        ],
      }));
    }
  };

  // Eliminar una tarea
  const removeTask = (taskToRemove) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks[date.toDateString()].filter(
        (task) => task !== taskToRemove
      );
      return {
        ...prevTasks,
        [date.toDateString()]: updatedTasks,
      };
    });
  };


  const tileClassName = ({ date, view }) => {
    if (tasks[date.toDateString()]) {
      return 'has-task'; 
    }
    return '';
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
          <h3>Tareas para: {date.toDateString()}</h3>
          <div>
            {tasks[date.toDateString()] && tasks[date.toDateString()].length > 0 ? (
              <>
                <h4>Lista de Tareas:</h4>
                <ul>
                  {tasks[date.toDateString()]?.map((task, index) => (
                    <li key={index}>
                      {task}
                      <button
                        onClick={() => removeTask(task)}
                        style={{
                          marginLeft: "10px",
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          padding: "5px 10px",
                        }}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No hay tareas para este día.</p>
            )}
          </div>
          <button onClick={addTask}>➕ Agregar Tarea</button>
        </div>
      </div>
    </div>
  );
}

export default TaskCalendar;
