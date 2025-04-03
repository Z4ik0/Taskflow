import "./styles/Notes.css";

const Notas = ({ notas, seleccionarNota, eliminarNota }) => {
  return (
    <div className="notas-wrapper">
      {notas.length === 0 ? (
        <div className="no-notas">No hay notas guardadas.</div>
      ) : (
        <div className="notas-grid">
          {notas.map((nota) => (
            <div key={nota.id} className="nota-card">
              <div className="nota-card-body">
                <h5 className="nota-card-title">{nota.titulo}</h5>
                <p className="nota-card-category">
                  Categoría: <span>{nota.categoria || "Sin categoría"}</span>
                </p>
                <button
                  className="nota-card-view"
                  onClick={() => seleccionarNota(nota.id)}
                >
                  Ver Nota
                </button>
                <button
                  className="nota-card-delete"
                  onClick={() => eliminarNota(nota.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notas;
