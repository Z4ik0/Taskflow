import React, { useState } from "react";
import TaskCalendar from "./calendar";
import Welcome from "./components/Welcome";

//Importar los modulos de Firebase
import appFirebase from '../src/credenciales.js'
import {getAuth, onAuthStateChanged} from 'firebase/auth';
const auth = getAuth(appFirebase)

//importar componentes
import Login from '../src/components/login.jsx'
import Home from '../src/components/home.jsx'


function App() {

  const [usuario, setUsuario] = useState(null)
  onAuthStateChanged(auth, (usuarioFirebase)=>{
    if (usuarioFirebase){
      setUsuario(usuarioFirebase)
    }
    else 
    {
      setUsuario(null)
    }
  })

  return (
    <div>
      {usuario ? <Home correoUsusario = {usuario.email}/> : <Login/>}
    </div>
  )
}




export default App;


/*Mover sus cosas


function App() {
//Constante para validacion del ususario
  const [usuario, setUsuario] = useState(null)
  onAuthStateChanged(auth, (usuarioFirebase)=>{
    if (usuarioFirebase){
      setUsuario(usuarioFirebase)
    }
    else 
    {
      setUsuario(null)
    }
  })



  const [showWelcome, setShowWelcome] = useState(true);

  const handleStart = () => {
    setShowWelcome(false);
  };

  return (
    <div className="App">
      {showWelcome ? (
        <Welcome onStart={handleStart} />
      ) : (
        <>
          <h1 className="text-center my-4">Taskflow</h1>
          <div>
            {usuario ? <Home correoUsusario = {usuario.email}/> : <Login/>}
          </div>
          <TaskCalendar />
        </>
      )}
    </div>
  );
}
**/