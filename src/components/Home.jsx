import React from "react";
import appFirebase from "../credenciales.js";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import ToDoList from "./to-do_list.jsx";
import TaskCalendar from "./calendar.jsx";
const auth = getAuth(appFirebase);

const Home = ({ correoUsusario }) => {
  return (
    <div>
      {/* <h1 className="center">
        Bienbenido usuario{correoUsusario}{" "}
        <button className="btn-primary" onClick={() => signOut(auth)}>
          Logout
        </button>
      </h1> */}
      <br />
      <ToDoList />
      {/* <TaskCalendar /> */}
    </div>
  );
};

export default Home;
