import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";

function TaskCalendar() {
  const [date, setDate] = useState(new Date());
  const [tareas, enviarTareas] = useState({});
  const [asuntos, enviarAsunto] = useState({});
  const [taskToNotify, setTaskToNotify] = useState(null); // Estado para almacenar la tarea o asunto seleccionada para notificación

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

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: body,
        icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
      });
    } else {
      console.log("Permiso de notificación no concedido.");
    }
  };

  // Función que se ejecuta cuando el usuario hace clic en "Notificar"
  const handleNotifyButtonClick = () => {
    if (taskToNotify) {
      const now = new Date().getTime();
      const selectedDate = new Date(date); // Asegurarse de que la fecha seleccionada se ajuste correctamente
      selectedDate.setHours(0, 0, 0, 0); // Establecer la hora de la tarea a medianoche

      const TiempoTarea = selectedDate.getTime();
      const delay = TiempoTarea - now - 60000; // 1 minuto antes

      console.log(`Notificando: ${taskToNotify}`);
      console.log(`Tiempo de la tarea/asunto: ${TiempoTarea}`);
      console.log(`Delay de notificación: ${delay}`);

      if (delay > 0) {
        setTimeout(() => {
          showNotification("⏳ Recordatorio", `¡Recuerda! Tienes pendiente: ${taskToNotify}`);
        }, delay);
      } else {
        console.log("La tarea o asunto ya pasó, no se puede notificar.");
      }
    } else {
      console.log("No hay tarea o asunto seleccionado para notificar.");
    }
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
      localStorage.setItem("tareas", JSON.stringify(newTareas));
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
      localStorage.setItem("asuntos", JSON.stringify(newAsuntos));
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
          <h3>Tareas para: {date.toLocaleDateString("es-ES")}</h3>

          <div>
            {tareas[date.toDateString()]?.length ? (
              <ul>
                {tareas[date.toDateString()].map((tarea, index) => (
                  <li key={index}>
                    {tarea}
                    <button 
                      className="notify-btn" 
                      onClick={() => setTaskToNotify(tarea)} // Establecer la tarea a notificar
                    >
                      🔔 Notificar
                    </button>
                    <button className="delete-btn" onClick={() => eliminarTarea(tarea)}>Eliminar</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay tareas para este día.</p>
            )}
          </div>

          <h3>Asuntos: {date.toLocaleDateString("es-ES")}</h3>
          <div>
            {asuntos[date.toDateString()]?.length ? (
              <ul>
                {asuntos[date.toDateString()].map((asunto, index) => (
                  <li key={index}>
                    {asunto}
                    <button 
                      className="notify-btn" 
                      onClick={() => setTaskToNotify(asunto)} // Establecer el asunto a notificar
                    >
                      🔔 Notificar
                    </button>
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

          {/* Botón para disparar la notificación */}
          <button className="notify-btn" onClick={handleNotifyButtonClick}>
            Enviar Notificación
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCalendar;
