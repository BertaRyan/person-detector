import React from 'react'
import "./rank.css"

const Rank = ({currentUser}) => {
  return (
    <div className="rank-container">
      Good Job <span className="user-text">{currentUser.name}</span> your score is {currentUser.entries}
    </div>
  )
}

export default Rank