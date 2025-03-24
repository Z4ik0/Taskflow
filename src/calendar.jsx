import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";

function TaskCalendar() {
  const [date, setDate] = useState(new Date());
  const [tareas, enviarTareas] = useState({});
  const [asuntos, enviarAsunto] = useState({});

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tareas")) || {};
    const storedAsunts = JSON.parse(localStorage.getItem("asuntos")) || {};
    enviarTareas(storedTasks);
    enviarAsunto(storedAsunts);
  }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    localStorage.setItem("asuntos", JSON.stringify(asuntos));
  }, [asuntos]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const agregarTarea = () => {
    const tareaText = prompt("Escribe tu tarea:");
    if (tareaText) {
      enviarTareas((prevTareas) => {
        const newTareas = {
          ...prevTareas,
          [date.toDateString()]: [...(prevTareas[date.toDateString()] || []), tareaText],
        };
        localStorage.setItem("tareas", JSON.stringify(newTareas));
        return newTareas;
      });
    }
  };

  const agregarAsunto = () => {
    const asuntoText = prompt("Escribe el Asunto:");
    if (asuntoText) {
      enviarAsunto((prevAsuntos) => {
        const newAsuntos = {
          ...prevAsuntos,
          [date.toDateString()]: [...(prevAsuntos[date.toDateString()] || []), asuntoText],
        };
        localStorage.setItem("asuntos", JSON.stringify(newAsuntos));
        return newAsuntos;
      });
    }
  };

  const eliminarTarea = (eliminarTareas) => {
    enviarTareas((prevTareas) => {
      const actualizarTareas = prevTareas[date.toDateString()].filter((tarea) => tarea !== eliminarTareas);
      const newTareas = { ...prevTareas };  
      if (actualizarTareas.length === 0) {
        delete newTareas[date.toDateString()];
      } else {
        newTareas[date.toDateString()] = actualizarTareas;
      }
      localStorage.setItem("tasks", JSON.stringify(newTareas));
      return newTareas;
    });
  };
 
  const eliminarAsunto = (eliminarAsuntos) => {
    enviarAsunto((prevAsuntos) => {
      const actualizarAsuntos = prevAsuntos[date.toDateString()].filter((asunto) => asunto !== eliminarAsuntos);
      const newAsuntos = { ...prevAsuntos };
      if (actualizarAsuntos.length === 0) {
        delete newAsuntos[date.toDateString()];
      } else {
        newAsuntos[date.toDateString()] = actualizarAsuntos;
      }
      localStorage.setItem("asunts", JSON.stringify(newAsuntos));
      return newAsuntos;
    });
  };

  const tileClassName = ({ date }) => {
    return tareas[date.toDateString()] ? "has-task" : "";
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

        
        <div className="tareas">
          <h3>Tareas para: {date.toLocaleDateString("es-ES", )}</h3>
          
          <div>
            {tareas[date.toDateString()]?.length ? (
              <ul>
                {tareas[date.toDateString()].map((tarea, index) => (
                  <li key={index}>
                    {tarea}
                    <button className="delete-btn" onClick={() => eliminarTarea(tarea)}>Eliminar</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay tareas para este día.</p>
            )}
          </div>

          <h3>Asuntos:</h3>
          <div>
            {asuntos[date.toDateString()]?.length ? (
              <ul>
                {asuntos[date.toDateString()].map((asunto, index) => (
                  <li key={index}>
                    {asunto}
                    <button className="delete-btn" onClick={() => eliminarAsunto(asunto)}>Eliminar</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay asuntos para esta fecha.</p>
            )}
          </div>

          <button className="add-btn" onClick={agregarTarea}>➕ Agregar Tarea</button>
          <button className="add-btn" onClick={agregarAsunto}>📄 Agregar Asunto</button>
        </div>
      </div>
    </div>
  );
}

export default TaskCalendar;
