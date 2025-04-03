import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles/calendar.css";

function TaskCalendar() {
  const [date, setDate] = useState(new Date());
  const [tareas, enviarTareas] = useState({});
  const [asuntos, enviarAsunto] = useState({});
  const [viewMode, setViewMode] = useState("day");
  const [correos, setCorreos] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tareas")) || {};
    const storedAsuntos = JSON.parse(localStorage.getItem("asuntos")) || {};
    const storedCorreos = JSON.parse(localStorage.getItem("correos")) || [];
    enviarTareas(storedTasks);
    enviarAsunto(storedAsuntos);
    setCorreos(storedCorreos);
  }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    localStorage.setItem("asuntos", JSON.stringify(asuntos));
  }, [asuntos]);

  useEffect(() => {
    localStorage.setItem("correos", JSON.stringify(correos));
  }, [correos]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const agregarCorreo = () => {
    const nuevoCorreo = prompt("Introduce el correo del profesor:");
    if (nuevoCorreo) {
      setCorreos([...correos, nuevoCorreo]);
    }
  };

  const renderCorreos = () => {
    return (
      <div className="small-list">
        {correos.length ? (
          <ul>
            {correos.map((correo, index) => (
              <li key={index} className="correo">
                {correo}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay correos registrados.</p>
        )}
      </div>
    );
  };

  const getAsuntosForPeriod = () => {
    if (viewMode === "day") {
      const formattedDate = date.toDateString();
      return asuntos[formattedDate] || [];
    } else if (viewMode === "week") {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      const weekDates = [];

      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + i);
        const formattedDate = currentDay.toDateString();
        if (asuntos[formattedDate]) {
          weekDates.push(...asuntos[formattedDate]);
        }
      }
      return weekDates;
    } else if (viewMode === "month") {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const monthDates = [];

      for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
        const formattedDate = d.toDateString();
        if (asuntos[formattedDate]) {
          monthDates.push(...asuntos[formattedDate]);
        }
      }
      return monthDates;
    }
  };

  const getTareasForPeriod = () => {
    if (viewMode === "day") {
      const formattedDate = date.toDateString();
      return tareas[formattedDate] || [];
    } else if (viewMode === "week") {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      const weekDates = [];

      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + i);
        const formattedDate = currentDay.toDateString();
        if (tareas[formattedDate]) {
          weekDates.push(...tareas[formattedDate]);
        }
      }
      return weekDates;
    } else if (viewMode === "month") {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const monthDates = [];

      for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
        const formattedDate = d.toDateString();
        if (tareas[formattedDate]) {
          monthDates.push(...tareas[formattedDate]);
        }
      }
      return monthDates;
    }
  };

  const renderAsuntos = () => {
    const asuntosForPeriod = getAsuntosForPeriod();
    return (
      <div className="small-list">
        {asuntosForPeriod.length ? (
          <ul>
            {asuntosForPeriod.map((asunto, index) => (
              <li key={index} className="asunto">
                {asunto}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay asuntos para este periodo.</p>
        )}
      </div>
    );
  };

  const renderTareas = () => {
    const tareasForPeriod = getTareasForPeriod();
    return (
      <div className="small-list">
        {tareasForPeriod.length ? (
          <ul>
            {tareasForPeriod.map((tarea, index) => (
              <li key={index} className="tarea">
                {tarea}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay tareas para este periodo.</p>
        )}
      </div>
    );
  };

  const markDays = ({ date, view }) => {
    const formattedDate = date.toDateString();
    let classes = "";

    // Marcar días con tareas
    if (tareas[formattedDate]) {
      classes += " highlight-day-tarea";
    }

    // Marcar días con asuntos
    if (asuntos[formattedDate]) {
      classes += " highlight-day-asunto";
    }

    return classes;
  };

  return (
    <div className="calendar-container">
      <h2>Tu Calendario</h2>

      <div className="view-toggle">
        <button onClick={() => setViewMode("week")}>Por Semana</button>
        <button onClick={() => setViewMode("month")}>Por Mes</button>
      </div>

      <div className="calendar-and-tasks">
        <div className="calendar">
          <Calendar
            onChange={handleDateChange}
            value={date}
            locale="es-ES"
            tileClassName={({ date, view }) => markDays({ date, view })}
          />
        </div>

        <div className="asuntos-tareas-correos">
          <div className="asuntos-tareas">
            <h3>Asuntos de: {date.toLocaleDateString("es-ES")}</h3>
            {renderAsuntos()}
            <button
              className="add-btn"
              onClick={() => {
                const nuevoAsunto = prompt("Introduce el asunto:");
                if (nuevoAsunto) {
                  const formattedDate = date.toDateString();
                  const updatedAsuntos = {
                    ...asuntos,
                    [formattedDate]: [...(asuntos[formattedDate] || []), nuevoAsunto],
                  };
                  enviarAsunto(updatedAsuntos);
                }
              }}
            >
              ➕ Agregar Asunto
            </button>

            <h3>Tareas de: {date.toLocaleDateString("es-ES")}</h3>
            {renderTareas()}
            <button
              className="add-btn"
              onClick={() => {
                const nuevaTarea = prompt("Introduce la tarea:");
                if (nuevaTarea) {
                  const formattedDate = date.toDateString();
                  const updatedTareas = {
                    ...tareas,
                    [formattedDate]: [...(tareas[formattedDate] || []), nuevaTarea],
                  };
                  enviarTareas(updatedTareas);
                }
              }}
            >
              ➕ Agregar Tarea
            </button>
          </div>

          <div className="correos-section">
            <h3>Email Profes</h3>
            {renderCorreos()}
            <button className="add-btn" onClick={agregarCorreo}>
              ➕ Agregar Correo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCalendar;
