import React, { useState } from "react";
import Imagen from '../assets/img/imagen.jpeg';
import Profile from '../assets/img/profile.jpeg';
import "./styles/login.css";

import appFirebase from "../credenciales.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
const auth = getAuth(appFirebase)

const Login = () => {
        const [registrando, setRegistrando] = useState(false)
        const funcAutenticacion = async (e) => {
            e.preventDefault();
            const correo = e.target.email.value;
            const contraseña = e.target.password.value;
            
            if (registrando) {
                try {
                    await createUserWithEmailAndPassword(auth, correo, contraseña)
                } catch (error) {
                    alert("Asegurese que la contraseña tiene al menos 8 caracteres")
                }
            }
            else {
                try {
                    await signInWithEmailAndPassword(auth, correo, contraseña)
                } catch (error) {
                    alert("El correo o la contraseña son incorrectos")
                }
                
            }

        }
    return (
    <div className="container">
        <div className="row">
            {/* Formulario de login */}
            <div className="col-md-4">
                <div className="padre">
                    <div className="card card-body shadow-lg">
                        <img src={Profile} alt="" className="estilo-profile" />
                        <form onSubmit={funcAutenticacion} >
                            <input type="text" placeholder="Ingresar Email" className="cajatexto" id="email"/>
                            <input type="password" placeholder="Ingresar Contraseña" className="cajatexto" id="password" />
                            <button className="btnform">{registrando ? "Registrate" : "Inicia Sesion"}</button>
                        </form> 
                        <h4 className="texto">{registrando ? "Si Ya Tienes Cuenta" : "No Tienes Cuenta"}<button className="btnswitch" onClick={()=>setRegistrando(!registrando)}>{registrando ? "Inicia Sesion" : "Registrate"}</button></h4> 
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