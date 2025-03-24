import { useState } from 'react'
import React from "react";
import TaskCalendar from "./calendar";

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center my-4">  Taskflow</h1>
      <TaskCalendar />
    </div>
  );
}

export default App;
