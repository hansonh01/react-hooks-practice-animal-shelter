import React, { useState } from "react";

function Pet({pet}) {
  const { id, type, gender, age, weight, name, isAdopted} = pet;
  const [adopt, setAdopt] = useState(isAdopted);

  const handleAdopting = () => {
    fetch(`http://localhost:3001/pets/${id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({isAdopted:!adopt})
    })
      .then(r=>r.json())
      .then(()=>{
        setAdopt(!adopt)
      })
  };

  return (
    <div className="card" data-testid="pet">
      <div className="content">
        <span className="header">
          {gender === "male" ? '♂' : '♀'}
          {name}
        </span>
        <div className="meta">
          <span className="date">{type}</span>
        </div>
        <div className="description">
          <p>Age: {age}</p>
          <p>Weight: {weight}</p>
        </div>
      </div>
      <div className="extra content" onClick={handleAdopting}>
        {adopt ? 
        <button className="ui disabled button">Already adopted</button> : 
        <button className="ui primary button">Adopt pet</button>}
        
      </div>
    </div>
  );
}

export default Pet;