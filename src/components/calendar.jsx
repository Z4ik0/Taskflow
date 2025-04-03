import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles/calendar.css";

function TaskCalendar() {
  const [date, setDate] = useState(new Date());
  const [tareas, enviarTareas] = useState({});
  const [asuntos, enviarAsunto] = useState({});
  const [viewMode, setViewMode] = useState("day");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tareas")) || {};
    const storedAsuntos = JSON.parse(localStorage.getItem("asuntos")) || {};
    enviarTareas(storedTasks);
    enviarAsunto(storedAsuntos);
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

  const addNotification = (message) => {
    setNotifications((prev) => [...prev, message]);
    alert(message); // Notificación inmediata
  };

  const agregarTarea = () => {
    const nuevaTarea = prompt("Introduce la tarea:");
    const limiteTarea = prompt("Introduce la fecha límite (yyyy-mm-dd):");
    if (nuevaTarea && limiteTarea) {
      const formattedDate = date.toDateString();
      const updatedTareas = { ...tareas, [formattedDate]: [...(tareas[formattedDate] || []), nuevaTarea] };
      enviarTareas(updatedTareas);

      // Agregar notificación
      addNotification(`Tarea: "${nuevaTarea}" debe completarse antes del ${limiteTarea}`);
    }
  };

  const agregarAsunto = () => {
    const nuevoAsunto = prompt("Introduce el asunto:");
    const limiteAsunto = prompt("Introduce la fecha límite (yyyy-mm-dd):");
    if (nuevoAsunto && limiteAsunto) {
      const formattedDate = date.toDateString();
      const updatedAsuntos = { ...asuntos, [formattedDate]: [...(asuntos[formattedDate] || []), nuevoAsunto] };
      enviarAsunto(updatedAsuntos);

      // Agregar notificación
      addNotification(`Asunto: "${nuevoAsunto}" debe completarse antes del ${limiteAsunto}`);
    }
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
          />
        </div>

        <div className="asuntos-tareas">
          <h3>Asuntos de: {date.toLocaleDateString("es-ES")}</h3>
          <button className="add-btn" onClick={agregarAsunto}>
            ➕ Agregar Asunto
          </button>

          <h3>Tareas de: {date.toLocaleDateString("es-ES")}</h3>
          <button className="add-btn" onClick={agregarTarea}>
            ➕ Agregar Tarea
          </button>

          <h3>Notificaciones</h3>
          <ul>
            {notifications.map((notif, index) => (
              <li key={index}>{notif}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TaskCalendar;
