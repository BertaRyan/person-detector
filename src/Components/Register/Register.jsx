import {useState} from 'react'
import "./Register.css"

const Register = ({register, setRegister}) => {
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [error, setError] = useState('')

    const submitRegisterForm = async (e) => {
        e.preventDefault()
    
        try{

            if (!fName || !lName || !emailValue || !passwordValue) {

                throw new Error("Please fill out all fields.");

            }

            const newUser = {
                name: fName,
                email: emailValue,
                password: passwordValue,
                id: Math.floor(Math.random() * 250),
                imageCount: 0
            }


            const resp = await fetch("https://person-detector-api-9qbp-bf764v2ql-ryans-projects-ba395f22.vercel.app//register", {
                method: "post",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(newUser)
            })
            const data = await resp.json()
            if(resp.status === 200){
            setFName('')
            setLName('')
            setEmailValue('')
            setPasswordValue('')
            setRegister(false)
            } else{
                setFName('')
                setLName('')
                setEmailValue('')
                setPasswordValue('')
                throw new Error(data);
            }
        }catch(err){
            setError(err.message)
            setTimeout(() => {
                setError('')
            },2000)
        }
    }


  return (
      <div className={ register ? "register-form-container" : "hide-register-form"}>
          <h2 style={{ textAlign: "center" }} className={register ? "" : "hide"}>Want to try the AI Machine learning Tool? <br></br> Register Today</h2>
          <form action="POST" className={register ? "": "hide"}>
              <div className="double-input">
                  <label htmlFor="FirstName">First Name: </label>
                  <input type="text" onChange={(e) => setFName(e.target.value)} value={fName} id='FirstName' />
              </div>
              <div className="double-input">
                  <label htmlFor="LastName">Last Name: </label>
                  <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} id='LastName' />
              </div>
              <div className="double-input">
                  <label htmlFor="email">Email: </label>
                  <input type="text" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} id='email' />
              </div>
              <div className="double-input">
                  <label htmlFor="password">Password: </label>
                  <input type="password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} id='password' />
              </div>
              <button onClick={submitRegisterForm}>Register</button>
          </form>
           <p className="errorMessage" style={{color: "red"}}>{error}</p>
      </div>
  )
}

export default Register