import React, { useState, useEffect } from "react";
import appFirebase from "../credenciales.js";
import { getAuth, signOut } from "firebase/auth";
import ToDoList from "./to-do_list.jsx";
import TaskCalendar from "./calendar.jsx";

import NotaForm from "./Notesform.jsx";
import Notas from "./Notes.jsx";

const auth = getAuth(appFirebase);
const Home = ({ correoUsusario }) => {
  
  // ! logica de notas
  const [notas, setNotas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null); // Estado para la nota seleccionada

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

  // ! FIN logica de notas

  const [activeComponent, setActiveComponent] = useState("summary");

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
            <h2>Bienvenido a Taskflow</h2>
            <p>
              Taskflow es una herramienta diseñada para ayudarte a organizar tus
              tareas diarias y planificar eventos importantes. Puedes gestionar
              tus listas de tareas pendientes y utilizar un calendario
              interactivo para establecer fechas límite.
            </p>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Taskflow</h1>
        <button className="btn btn-danger" onClick={() => signOut(auth)}>
          Cerrar sesión
        </button>
      </div>

      {/* Menú de navegación */}
      <nav className="nav nav-pills mb-4">
        <button
          className={`nav-link ${
            activeComponent === "summary" ? "active" : ""
          }`}
          onClick={() => setActiveComponent("summary")}
        >
          Resumen
        </button>
        <button
          className={`nav-link ${
            activeComponent === "calendar" ? "active" : ""
          }`}
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
        <button
          className={`nav-link ${activeComponent === "notes" ? "active" : ""}`}
          onClick={() => setActiveComponent("notes")}
        >
          Notas
        </button>
      </nav>

      {/* Renderizar el componente activo */}
      <div>{renderComponent()}</div>
    </div>
  );
};

export default Home;
