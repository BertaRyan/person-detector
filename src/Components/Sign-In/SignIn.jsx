import {useState} from 'react'
import "./signIn.css"

const SignIn = ({register, signedIn, isSignedIn, currentUser, setCurrentUser }) => {
  const [inputImg, setInputImg] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [user, setUser] = useState({})
  const [error, setError] = useState('')

  const signUserIn = async (e) => {
    e.preventDefault()
    const newUser = {email:emailValue, password: passwordValue}
    const fetchOptions = {
      method: "post",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(newUser)
    }

    try{
      if(!emailValue || !passwordValue){
        throw new Error('Please fill out all fields')
      }
      const res = await fetch("https://person-detector-api-9qbp.vercel.app/signin", fetchOptions)
      const data = await res.json()
      if(res.status === 200){
        isSignedIn(!signedIn)
        setEmailValue('')
        setPasswordValue('')
        setCurrentUser({...data})
      } else{
        setEmailValue('')
        setPasswordValue('')
        throw new Error(data);
     
      }
     
    } catch(err){
      setError(err.message)
      setTimeout(() => {
        setError('')
      },2000)
    }
  }

  
  return (
      <div className={signedIn || register == true ? "sign-in-hide" : register ? "sign-in-hide" : "sign-in-form-container" }>
      <h2 style={{textAlign:"center", fontSize:"30px"}}>Sign In</h2>
        <form action="POST">
          <div className="double-input">
            <label htmlFor="email">Email: </label>
          <input type="text" id='email' value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
          </div>
          <div className="double-input">
            <label htmlFor="password">Password: </label>
            <input type="password" id='password'value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
          </div>
          <button onClick={signUserIn}>Submit</button>
        </form>
        {error && <p style={{color: "red"}}>{error}</p>}
    </div>
  )
}

export default SignIn