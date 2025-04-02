import React, { useState } from "react";
import appFirebase from "../credenciales.js";
import { getAuth, signOut } from "firebase/auth";
import ToDoList from "./to-do_list.jsx";
import TaskCalendar from "./calendar.jsx";

const auth = getAuth(appFirebase);

const Home = ({ correoUsusario }) => {
  const [activeComponent, setActiveComponent] = useState("summary");

  const renderComponent = () => {
    switch (activeComponent) {
      case "calendar":
        return <TaskCalendar />;
      case "todo":
        return <ToDoList />;
      default:
        return (
          <div className="text-center p-4">
            <h2>Bienvenido a Taskflow</h2>
            <p>
              Taskflow es una herramienta diseñada para ayudarte a organizar tus tareas diarias y planificar eventos importantes. 
              Puedes gestionar tus listas de tareas pendientes y utilizar un calendario interactivo para establecer fechas límite.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Taskflow</h1>
        <button
          className="btn btn-danger"
          onClick={() => signOut(auth)}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Menú de navegación */}
      <nav className="nav nav-pills mb-4">
        <button
          className={`nav-link ${activeComponent === "summary" ? "active" : ""}`}
          onClick={() => setActiveComponent("summary")}
        >
          Resumen
        </button>
        <button
          className={`nav-link ${activeComponent === "calendar" ? "active" : ""}`}
          onClick={() => setActiveComponent("calendar")}
        >
          Calendario
        </button>
        <button
          className={`nav-link ${activeComponent === "todo" ? "active" : ""}`}
          onClick={() => setActiveComponent("todo")}
        >
          Lista de Tareas
        </button>
      </nav>

      {/* Renderizar el componente activo */}
      <div>{renderComponent()}</div>
    </div>
  );
};

export default Home;
