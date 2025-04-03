import React, { useState } from "react";
import Imagen from '../assets/img/abeja.gif';
import Profile from '../assets/img/profile.jpeg';
import "./styles/login.css";

import Swal from "sweetalert2";

import appFirebase from "../credenciales.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(appFirebase);

const Login = () => {
    const [registrando, setRegistrando] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const funcAutenticacion = async (e) => {
        e.preventDefault();
        const correo = e.target.email.value.trim();
        const contraseña = e.target.password.value.trim();
    
        console.log("Modo registro:", registrando); // Debug
    
        if (!correo || !contraseña) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor, complete todos los campos.",
            });
            return;
        }
    
        try {
            if (registrando) {
                // Confirmación para registro
                const { isConfirmed } = await Swal.fire({
                    title: "Confirmar registro",
                    html: `
                        <p><strong>Email:</strong> ${correo}</p>
                        <p><strong>Contraseña:</strong> ${contraseña}</p>
                        <p>¿Desea proceder con estos datos?</p>
                    `,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Sí, registrar",
                    cancelButtonText: "Cancelar",
                });
    
                if (!isConfirmed) return;
    
                await createUserWithEmailAndPassword(auth, correo, contraseña);
                Swal.fire({
                    icon: "success",
                    title: "Registro exitoso",
                    text: "Usuario registrado exitosamente.",
                });
            } else {
                console.log("Intentando iniciar sesión..."); // Debug
                await signInWithEmailAndPassword(auth, correo, contraseña);
                Swal.fire({
                    icon: "success",
                    title: "Inicio de sesión exitoso",
                    text: "Bienvenido de nuevo.",
                });
            }
        } catch (error) {
            console.error(error); // Para ver el error en consola
            switch (error.code) {
                case "auth/email-already-in-use":
                    Swal.fire({
                        icon: "error",
                        title: "Correo en uso",
                        text: "El correo ya está en uso. Intente con otro.",
                    });
                    break;
                case "auth/invalid-email":
                    Swal.fire({
                        icon: "error",
                        title: "Correo inválido",
                        text: "El correo no tiene un formato válido.",
                    });
                    break;
                case "auth/weak-password":
                    Swal.fire({
                        icon: "error",
                        title: "Contraseña débil",
                        text: "La contraseña debe tener al menos 6 caracteres.",
                    });
                    break;
                case "auth/user-not-found":
                    Swal.fire({
                        icon: "error",
                        title: "Usuario no encontrado",
                        text: "Verifique el correo ingresado.",
                    });
                    break;
                case "auth/wrong-password":
                    Swal.fire({
                        icon: "error",
                        title: "Contraseña incorrecta",
                        text: "Contraseña incorrecta. Intente nuevamente.",
                    });
                    break;
                default:
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ocurrió un error. Intente nuevamente.",
                    });
            }
        }
    };
    

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <div className="row">
                {/* Formulario de login */}
                <div className="col-md-6">
                    <div className="padre">
                        <div className="card card-body shadow-lg">
                            <img src={Profile} alt="Perfil" className="estilo-profile" />
                            <form onSubmit={funcAutenticacion}>
                                <input
                                    type="text "
                                    placeholder="Ingresar Email"
                                    className="cajatexto"
                                    id="email"
                                    name="email"
                                    aria-label="Correo electrónico"
                                />

                                {/* Contenedor relativo para el input y el ícono */}
                                <div className="password-input">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Ingresar Contraseña"
                                        className="cajatexto"
                                        id="password"
                                        name="password"
                                        aria-label="Contraseña"
                                    />
                                    {/* Ícono de ojo */}
                                    <span className="icon-eye" onClick={toggleShowPassword}>
                                        {showPassword ? (
                                            // Ojo "abierto" (contraseña visible)
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                                                <path d="M13.359 11.238l1.385 1.386c.137-.202.254-.41.354-.63a7.027 7.027 0 0 0-9.638-9.64 7.032 7.032 0 0 0-.63.355l1.386 1.386a4.992 4.992 0 0 1 5.138 5.139zM8 3a5 5 0 0 1 5 5 4.98 4.98 0 0 1-.777 2.737l1.542 1.542A6.978 6.978 0 0 0 16 8a7 7 0 0 0-7-7c-1.23 0-2.39.287-3.42.802l1.542 1.542A4.98 4.98 0 0 1 8 3z"/>
                                                <path d="M3.354 1.646a.5.5 0 0 1 .708 0l10 10a.5.5 0 0 1-.708.708l-10-10a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        ) : (
                                            // Ojo "cerrado" (contraseña oculta)
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                                                <path d="M8 10.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                                            </svg>
                                        )}
                                    </span>
                                </div>

                                <button type="submit" className="btnform">
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
                {/* Columna más grande para imagen (GIF) */}
                <div className="col-md-6">
                    <img src={Imagen} alt="Fondo" className="tamaño-imagen" />
                </div>
            </div>
        </div>
    );
};

export default Login;
