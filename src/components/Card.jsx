import React from 'react'
import '../assets/styles/Card.css'
const Card = ({person}) =>{
    return (
        <React.Fragment>
            <div className="card-container">
                <div className="card-content">
                    <div className="card-content_header">{person.name}</div>
                    <div className="card-content_meta">{person.publicId}</div>
                    <div className="card-content_meta">{person.weight}</div>
                </div>
                <img
                src={person.picture}
                className="card_img"
                alt="Profile"
                />

            </div>
  </React.Fragment>
    )
}

export default Card