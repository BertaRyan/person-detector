import React from 'react'
import "./FaceBox.css"

const faceBox = ({boxs}) => {

  return (
    <div className="bounding-container">
        {boxs.map(box => {
          return <div className="box" key={box.score} style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
            </div>
        })}
    </div>
  )
}

export default faceBox