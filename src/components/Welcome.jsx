import React from "react";
import "./Welcome.css";

function Welcome({ onStart }) {
  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <h1 className="welcome-title">
          Bienvenido a <span className="text-highlight">Taskflow</span>
        </h1>
        <p className="welcome-description">
          Taskflow es tu herramienta definitiva para organizar tus tareas, gestionar tus listas por hacer y planificar fechas importantes en un calendario interactivo.
        </p>
        <button className="welcome-button" onClick={onStart}>
          Comenzar
        </button>
      </div>
    </div>
  );
}

export default Welcome;