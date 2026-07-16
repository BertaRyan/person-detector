import {useState, useEffect} from 'react'
import FaceBox from "../FaceBoxes/FaceBox"
import Rank from "../Rank/Rank"
import Tilt from 'react-parallax-tilt';
import "./Form.css"

const Form = ({ handleFormImg, inputImg, signedIn, sendImageToHuggingFaceWithFetch, boxs, isLoading, currentUser, setCurrentUser }) => {
  const [imgInputValue, setImgInputValue] = useState('')
  
  const handleChange = () => {
    console.log(e.target.value)
    setImgInputValue(e.target.value)
  }
  
  const handleClick = async () => {
    handleFormImg(imgInputValue)
    sendImageToHuggingFaceWithFetch(imgInputValue)
    setImgInputValue("")
   
    try{
      const res = await fetch(`http://localhost:3000/image`, {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(currentUser)
      })
      const data = await res.json()
      setCurrentUser({...currentUser, entries: data.entries})
  
    }catch(err){
      console.log(err.message)
    } 
  }

useEffect(() => {
  if(!signedIn){
    handleFormImg("")
  }
},[signedIn])
  
  return  <div className={signedIn ? "form-body" : "hide-form-body"}>
    <Rank currentUser={currentUser} />
    <Tilt tiltAngleYInitial={5} tiltAngleXInitial={5} tiltMaxAngleX={5} tiltMaxAngleY={5} glareMaxOpacity={"white"} className="tilt">
      <div className="link-form">
        <p>This Magic Brain will  detect People in your pictures. Give it a try!</p>
        <div className="spyware-container">
          <input className="file-input" type="text" placeholder="Paste an image" onChange={(e) => setImgInputValue(e.target.value)} value={imgInputValue} /> <button onClick={handleClick}>Detect Now</button>
        </div>
      </div>
      <div className="img-container">
        {inputImg && <div className="spyware-img-container"><img src={inputImg} width="300px" height="auto" /></div>}
        {inputImg && <FaceBox boxs={boxs} />}
      </div>

    </Tilt>
  </div > 
  
}

export default Form