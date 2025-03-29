import React from "react";
import appFirebase from "../credenciales.js";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import TaskCalendar from "../calendar";
import Welcome from "./Welcome";
const auth = getAuth(appFirebase);

const Home = ({ correoUsusario }) => {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleStart = () => {
    setShowWelcome(false);
  };

  return (
    <div>
      <h1 className="center">
        Bienbenido usuario{correoUsusario}{" "}
        <button className="btn-primary" onClick={() => signOut(auth)}>
          Logout
        </button>
      </h1>
      {showWelcome ? (
        <Welcome onStart={handleStart} />
      ) : (
        <>
          <h1 className="text-center my-4">Taskflow</h1>
          <TaskCalendar />
        </>
      )}
    </div>
  );
};

export default Home;
