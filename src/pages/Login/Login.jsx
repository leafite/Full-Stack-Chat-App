import React, {useState} from 'react'
import './Login.css'
import assets from '../../assets/images/assets'
import {signup, login} from '../../config/firebase'

const Login = () => {

  const [currState, setCurrState] = useState("Sign up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) =>{
    event.preventDefault();

    if(currState == "Sign up") {
      signup(username,email,password);
    }
    else{
      login(email,password);
    }
  }

  return (
    <div className='login'>
        <img src={assets.logo_big} alt="" className='logo' />
        <form onSubmit={onSubmitHandler} className="login-form">
            <h2>{currState}</h2>
            {currState =="Sign up" ? <input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" placeholder='username' className="form-input" required />:null}
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email address' className="form-input" required />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='password' className="form-input" required />
            <button type="submit">{currState == "Sign up"?"Create account":"Login"}</button>
            <div className="login-term">
                <input type='checkbox' />
                <p>I agree to the terms and conditions</p>
            </div>
            <div className="login-forgot">
              {
                currState == "Sign up"
                ?<p className="login-toggle">Already have an account <span onClick={()=>setCurrState("Login")}>Login here</span></p>
                :<p className="login-toggle">Create an account <span onClick={()=>setCurrState("Sign up")}>click here</span></p>
              }
            </div>
        </form>
    </div>
  )
}

export default Login