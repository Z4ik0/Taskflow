const Notas = ({ notas, eliminarNota }) => {
    return (
      <div className="mt-4">
        {notas.length === 0 ? (
          <div className="alert alert-info text-center">No hay notas guardadas.</div>
        ) : (
          <div className="row">
            {notas.map((nota) => (
              <div key={nota.id} className="col-md-4 mb-3">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{nota.titulo}</h5>
                    <p className="card-text">{nota.contenido}</p>
                    <small className="text-muted">{nota.fecha}</small>
                    <button
                      className="btn btn-danger btn-sm d-block mt-2"
                      onClick={() => eliminarNota(nota.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Notas;
  