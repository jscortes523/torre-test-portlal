import React from 'react'
import Bio from './Bio'
import '../assets/styles/BioList.css'
const BioList = ({bios,loading}) => {
    
    return (
      <div className="bio-list_container">
        <h5>
          {`Bio${bios.length > 0 ? "s" : ""} Posted: `} 
          <span className="badge badge-success">{bios.length}</span>{" "}          
        </h5>
    
        {bios.map((bio, index) => (
          <Bio key={index} bio={bio} />
        ))}
      </div>
    );
  }

export default BioList