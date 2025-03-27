import React, { useState } from "react";
import Imagen from '../assets/img/imagen.jpeg';
import Profile from '../assets/img/profile.jpeg';
import "../components/Login.css";

import appFirebase from "../credenciales.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
const auth = getAuth(appFirebase)

const Login = () => {
        const [registrando, setRegistrando] = useState(false)
    return (
    <div className="container">
        <div className="row">
            {/* Formulario de login */}
            <div className="col-md-4">
                <div className="padre">
                    <div className="card card-body shadow-lg">
                        <img src={Profile} alt="" className="estilo-profile" />
                        <form >
                            <input type="text" placeholder="Ingresar Email" className="cajatexto" />
                            <input type="password" placeholder="Ingresar Contraseña" className="cajatexto" />
                            
                        </form> 
                        
                    </div>
                </div>
            </div>
            {/*Columna mas grande para imagen */}
            <div className="col-md-8">
                <img src={Imagen} alt="" className="tamaño-imagen"/>
            </div>
        </div>
    </div>
    );
}

export default Login;