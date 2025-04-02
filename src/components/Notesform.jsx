import { useState } from "react";

const NotaForm = ({ agregarNota }) => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !contenido.trim()) return;

    agregarNota({
      id: Date.now(),
      titulo,
      contenido,
      fecha: new Date().toLocaleString(),
    });

    setTitulo("");
    setContenido("");
  };

  return (
    <form onSubmit={manejarEnvio} className="card p-3 shadow-sm">
      <h4 className="mb-3 text-primary">Agregar Nueva Nota</h4>
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Escribe tu nota aquí..."
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Guardar Nota
      </button>
    </form>
  );
};

export default NotaForm;
