import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const handleSetFilter = (e) => {
    setFilters({ type: e.target.value })
  };
  
  const handleFilter = () => {
    let url = 'http://localhost:3001/pets';

    if(filters.type !== "all"){
      url += `?type=${filters.type}`
    };

    fetch(url)
      .then(r=>r.json())
      .then(setPets)
  };

  const showAdopted = () => {
    fetch('http://localhost:3001/pets?isAdopted=true')
      .then(r=>r.json())
      .then(setPets)
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters 
            onSelectingFilter={handleSetFilter} 
            onFilter={handleFilter} 
            showAdopted={showAdopted}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;