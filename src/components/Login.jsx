import React, { useState } from "react";
import Imagen from '../assets/img/imagen.jpeg';
import Profile from '../assets/img/profile.jpeg';
import "./styles/login.css";

import appFirebase from "../credenciales.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(appFirebase);

const Login = () => {
    const [registrando, setRegistrando] = useState(false);

    const funcAutenticacion = async (e) => {
        e.preventDefault();
        const correo = e.target.email.value.trim();
        const contraseña = e.target.password.value.trim();

        // Validar campos vacíos
        if (!correo || !contraseña) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            if (registrando) {
                // Registro de usuario
                await createUserWithEmailAndPassword(auth, correo, contraseña);
                alert("Usuario registrado exitosamente.");
            } else {
                // Inicio de sesión
                await signInWithEmailAndPassword(auth, correo, contraseña);
                alert("Inicio de sesión exitoso.");
            }
        } catch (error) {
            // Manejo de errores
            switch (error.code) {
                case "auth/email-already-in-use":
                    alert("El correo ya está en uso. Intente con otro.");
                    break;
                case "auth/invalid-email":
                    alert("El correo no tiene un formato válido.");
                    break;
                case "auth/weak-password":
                    alert("La contraseña debe tener al menos 6 caracteres.");
                    break;
                case "auth/user-not-found":
                    alert("Usuario no encontrado. Verifique el correo.");
                    break;
                case "auth/wrong-password":
                    alert("Contraseña incorrecta. Intente nuevamente.");
                    break;
                default:
                    alert("Ocurrió un error. Intente nuevamente.");
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                {/* Formulario de login */}
                <div className="col-md-4">
                    <div className="padre">
                        <div className="card card-body shadow-lg">
                            <img src={Profile} alt="Perfil" className="estilo-profile" />
                            <form onSubmit={funcAutenticacion}>
                                <input
                                    type="email"
                                    placeholder="Ingresar Email"
                                    className="cajatexto"
                                    id="email"
                                    name="email"
                                    aria-label="Correo electrónico"
                                />
                                <input
                                    type="password"
                                    placeholder="Ingresar Contraseña"
                                    className="cajatexto"
                                    id="password"
                                    name="password"
                                    aria-label="Contraseña"
                                />
                                <button className="btnform">
                                    {registrando ? "Registrate" : "Inicia Sesión"}
                                </button>
                            </form>
                            <h4 className="texto">
                                {registrando ? "Si ya tienes cuenta" : "¿No tienes cuenta?"}
                                <button
                                    className="btnswitch"
                                    onClick={() => setRegistrando(!registrando)}
                                >
                                    {registrando ? "Inicia Sesión" : "Regístrate"}
                                </button>
                            </h4>
                        </div>
                    </div>
                </div>
                {/* Columna más grande para imagen */}
                <div className="col-md-8">
                    <img src={Imagen} alt="Fondo" className="tamaño-imagen" />
                </div>
            </div>
        </div>
    );
};

export default Login;