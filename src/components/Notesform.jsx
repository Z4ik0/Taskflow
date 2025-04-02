import { useState } from "react";
import "./styles/Notes.css";

const NotaForm = ({ agregarNota, categorias, agregarCategoria }) => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [archivo, setArchivo] = useState(null);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !contenido.trim()) return;

    const archivoURL = archivo ? URL.createObjectURL(archivo) : null;

    agregarNota({
      id: Date.now(),
      titulo,
      contenido,
      categoria,
      archivo: archivoURL,
      tipoArchivo: archivo ? archivo.type : null,
      fecha: new Date().toLocaleString(),
    });

    setTitulo("");
    setContenido("");
    setArchivo(null);
  };

  const manejarArchivo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivo(file);
    }
  };

  return (
    <div className="nota-form-wrapper">
      <form onSubmit={manejarEnvio} className="nota-form">
        <h4 className="nota-form-title">Agregar Nueva Nota</h4>

        <div className="nota-form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="nota-form-group">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Escribe tu nota..."
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
          ></textarea>
        </div>

        <div className="nota-form-group">
          <input
            type="file"
            className="form-control"
            onChange={manejarArchivo}
          />
        </div>

        <div className="nota-form-group">
          <select
            className="form-control"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="nota-form-group nota-form-inline">
          <input
            type="text"
            className="form-control"
            placeholder="Nueva categoría"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
          />
          <button
            type="button"
            className="btn-add-category"
            onClick={() => {
              if (
                nuevaCategoria.trim() &&
                !categorias.includes(nuevaCategoria)
              ) {
                agregarCategoria(nuevaCategoria);
                setNuevaCategoria("");
              }
            }}
          >
            Agregar
          </button>
        </div>

        <button type="submit" className="btn-submit">
          Guardar Nota
        </button>
      </form>
    </div>
  );
};

export default NotaForm;
