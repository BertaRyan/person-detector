import {useState, useEffect} from "react"
import * as fs from "node:fs";
import Navigation from "./Components/Navigation/Navigation"
import Form from "./Components/Form/Form"
import SignIn from "./Components/Sign-In/SignIn"
import Register from "./Components/Register/Register"
import Rank from "./Components/Rank/Rank"
import './App.css'
import ParticlesBg from 'particles-bg'


function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [signedIn, isSignedIn] = useState(false)
  const [register, setRegister] = useState(false)
  const [inputImg, setInputImg] = useState('')
  const [boxs, setBoxs] = useState([])
  const [isLoading, setIsLoading] = useState(false)



  const handleFormImg = (img) => {
    setInputImg(img)
  }

  // Convert HuggingFace API data to mimic Clarifai API data
 const createClarifaiBoundingBox = (pixelBox, imageWidth, imageHeight) => {
    return {
     
      left_col: pixelBox.xmin  / imageWidth,
      top_row: pixelBox.ymin / imageHeight,
      right_col: pixelBox.xmax / imageWidth ,
      bottom_row: pixelBox.ymax / imageHeight
    };
  }

  const calculateFaceLocation = (data) => {
    // Get ALL items labeled "person" instead of just the first one
    const personItems = data.filter(item => item.label === "person");

    // With new HuggingFace API we need display width as well as original image width
    const image = document.querySelector('.spyware-img-container img');
    
    const originalWidth = Number(image.naturalWidth);
    const originalHeight = Number(image.naturalHeight);
    const width = Number(image.width);
    const height = Number(image.height);
  
    // Loop through every person found and calculate their box
    const boundingBoxes = personItems.map(person => {
      const clarifaiFace =  createClarifaiBoundingBox(person.box, originalWidth, originalHeight);
      
      return {
        leftCol: clarifaiFace.left_col * width + 100 ,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width) + 100,
        bottomRow: height - (clarifaiFace.bottom_row * height)
      };
    });

    return boundingBoxes;
  }

  const displayFaceBox = (boxes) => {
    setBoxs([...boxes])
  }

  const sendImageToHuggingFaceWithFetch = async (imgInputValue) => {
    const response = await fetch('https://person-detector-api-9qbp.vercel.app/post-image', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({imgInputValue})
        });
    const data = await response.json()

    const result = data
    console.log(result, "RESULT********************")
    displayFaceBox(calculateFaceLocation(result))
  };
 
  return (
    <div>
      <Navigation register={register} setRegister={setRegister} isSignedIn={isSignedIn} signedIn={signedIn} currentUser={currentUser} />
     
      <Form isLoading={isLoading} boxs={boxs} sendImageToHuggingFaceWithFetch={sendImageToHuggingFaceWithFetch} handleFormImg={handleFormImg} signedIn={signedIn} inputImg={inputImg} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Register register={register} setRegister={setRegister} signIn={signedIn} />
      <SignIn setCurrentUser={setCurrentUser} currentUser={currentUser} register={register} signedIn={signedIn} isSignedIn={isSignedIn} />
      <ParticlesBg className="particles" num={50} type="cobweb" bg={true} />
    </div>
  )
}

export default App
