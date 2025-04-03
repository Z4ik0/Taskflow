import React, { useState, useEffect } from "react";
import appFirebase from "../credenciales.js";
import { getAuth, signOut } from "firebase/auth";
import ToDoList from "./to-do_list.jsx";
import TaskCalendar from "./calendar.jsx";
import NotaForm from "./Notesform.jsx";
import Notas from "./Notes.jsx";

// Importar el archivo CSS
import "./Home.css";

const auth = getAuth(appFirebase);

const Home = ({ correoUsusario }) => {
  const [notas, setNotas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);
  const [activeComponent, setActiveComponent] = useState("summary");

  useEffect(() => {
    const notasGuardadas = JSON.parse(localStorage.getItem("notas")) || [];
    const categoriasGuardadas =
      JSON.parse(localStorage.getItem("categorias")) || [];
    setNotas(notasGuardadas);
    setCategorias(categoriasGuardadas);
  }, []);

  useEffect(() => {
    localStorage.setItem("notas", JSON.stringify(notas));
  }, [notas]);

  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }, [categorias]);

  const agregarNota = (nota) => {
    setNotas([...notas, nota]);
  };

  const eliminarNota = (id) => {
    setNotas(notas.filter((nota) => nota.id !== id));
  };

  const agregarCategoria = (categoria) => {
    setCategorias([...categorias, categoria]);
  };

  const seleccionarNota = (id) => {
    const nota = notas.find((n) => n.id === id);
    setNotaSeleccionada(nota);
  };

  const cerrarNota = () => {
    setNotaSeleccionada(null);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "notes":
        return (
          <>
            {notaSeleccionada ? (
              <div className="nota-detalle">
                <h2>{notaSeleccionada.titulo}</h2>
                <p>{notaSeleccionada.contenido}</p>
                {notaSeleccionada.archivo && (
                  <div>
                    {notaSeleccionada.tipoArchivo.includes("image") ? (
                      <img
                        src={notaSeleccionada.archivo}
                        alt="Adjunto"
                        className="nota-detalle-imagen"
                      />
                    ) : (
                      <audio controls>
                        <source
                          src={notaSeleccionada.archivo}
                          type={notaSeleccionada.tipoArchivo}
                        />
                        Tu navegador no soporta el audio.
                      </audio>
                    )}
                  </div>
                )}
                <button className="btn btn-secondary mt-3" onClick={cerrarNota}>
                  Volver
                </button>
              </div>
            ) : (
              <>
                <NotaForm
                  agregarNota={agregarNota}
                  categorias={categorias}
                  agregarCategoria={agregarCategoria}
                />
                <Notas
                  notas={notas}
                  seleccionarNota={seleccionarNota}
                  eliminarNota={eliminarNota}
                />
              </>
            )}
          </>
        );
      case "calendar":
        return <TaskCalendar />;
      case "todo":
        return <ToDoList />;
      default:
        return (
          <div className="text-center p-4">
            <h2 className="fw-bold">Bienvenido a Taskflow</h2>
            <p className="lead">
              Taskflow es una herramienta diseñada para ayudarte a organizar tus tareas diarias y planificar eventos importantes. 
              Puedes gestionar tus listas de tareas pendientes y utilizar un calendario interactivo para establecer fechas límite.
            </p>
          </div>
        );
    }
  };

  return (
    <div>
      {/* Barra de navegación fija */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            Taskflow
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    activeComponent === "summary" ? "active" : ""
                  }`}
                  onClick={() => setActiveComponent("summary")}
                >
                  Resumen
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    activeComponent === "calendar" ? "active" : ""
                  }`}
                  onClick={() => setActiveComponent("calendar")}
                >
                  Calendario
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    activeComponent === "todo" ? "active" : ""
                  }`}
                  onClick={() => setActiveComponent("todo")}
                >
                  Lista de Tareas
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    activeComponent === "notes" ? "active" : ""
                  }`}
                  onClick={() => setActiveComponent("notes")}
                >
                  Notas
                </button>
              </li>
            </ul>
            <button
              className="btn btn-danger"
              onClick={() => signOut(auth)}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container mt-5 pt-5">
        <div className="card shadow-sm">
          <div className="card-body">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
