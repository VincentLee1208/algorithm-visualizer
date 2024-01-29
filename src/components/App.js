import React, { useState } from "react";
import Pathfinder from "./Pathfinder";
import Sorting from "./Sorting";
import Header from "./Header";

function App() {
  const [app, setApp] = useState("Pathfinder");

  const handlePathFinderChanger = () => {
    if(app === "Sorting") {
      setApp("Pathfinder");
    }
  };

  const handleSortingChanger = () => {
    if(app === "Pathfinder") {
      setApp("Sorting");
    }
  }

  if(app === "Pathfinder") {
    return (
      <div>
        <Header 
          onPathfinderClick={handlePathFinderChanger}
          onSortingClick={handleSortingChanger}
        />
        <Pathfinder />
      </div>
    );
  } else {
    return (
      <div>
        <Header 
          onPathfinderClick={handlePathFinderChanger}
          onSortingClick={handleSortingChanger}
        />
        <Sorting />
      </div>
    )
  }
  
};

export default App;
