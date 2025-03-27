import React, { useState } from "react";
import TaskCalendar from "./calendar";
import Welcome from "./components/Welcome";

function App() {
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
          <TaskCalendar />
        </>
      )}
    </div>
  );
}

export default App;
