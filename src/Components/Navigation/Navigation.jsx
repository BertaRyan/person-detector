import React from 'react'
import logo  from "../../../public/facial-recognition-logo.webp"
import "./Navigation.css"

const Navigation = ({ setRegister, register, isSignedIn, signedIn, currentUser}) => {

    const handleSignIn = () => {
        if(register) setRegister(false)
        isSignedIn(false)
        setRegister(false)
    }


  return (
    <header>
        <nav>
            <div className="logo">
                <img src={logo} alt="Facial Recognition Spyware Logo" />
            </div>
            <ul className="nav-link-container">
                  <li onClick={() => setRegister(!register)} className={signedIn ? "disabled": ""} >{signedIn ? `Welcome back ${currentUser.name}` : "Register"}</li>
                  <li onClick={() => handleSignIn()} className={signedIn ? "": register ? "" : "nav-signed-out"}>
                      {signedIn ? "Sign Out" : "Sign In"}
                  </li>
            </ul>
        </nav>
    </header>
  )
}

export default Navigation