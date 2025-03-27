import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Welcome({ onStart }) {
  return (
    <div className="welcome-page text-center p-5 bg-light vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-4 fw-bold mb-4">Bienvenido a <span className="text-primary">Taskflow</span></h1>
      <p className="lead mb-5">
        Taskflow es tu herramienta definitiva para organizar tus tareas, gestionar tus listas por hacer y planificar fechas importantes en un calendario interactivo.
      </p>
      <button
        className="btn btn-primary btn-lg"
        onClick={onStart}
      >
        Comenzar
      </button>
    </div>
  );
}

export default Welcome;