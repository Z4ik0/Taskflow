import React from "react";
import appFirebase from "../credenciales.js";
import {getAuth, signOut} from 'firebase/auth';
const auth = getAuth(appFirebase)

const Home = ({correoUsusario}) => {
    return (
    <div>
        <h1 className="center">Bienbenido usuario{correoUsusario} <button className="btn-primary" onClick={()=>signOut(auth)}>Logout</button></h1>
    </div>
    );
}

export default Home;