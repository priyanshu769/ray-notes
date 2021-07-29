import './LoginSignup.css'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'

export const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  console.log(state)
  const executeIfSignedUp = (signedUp) => {
    dispatch({
      type: 'SET_PROFILE',
      payload: {
        userId: signedUp.data.user._id,
        name: signedUp.data.user.name,
      },
    })
    dispatch({
      type: 'SET_LOGGEDIN_TOKEN',
      payload: signedUp.data.token,
    })
    localStorage.setItem(
      'token',
      JSON.stringify({ token: signedUp.data.token }),
    )
    navigate('/')
  }
  const signupHandler = async () => {
    const newUser = { name: name, email: email, password: password }
    try {
      const signedUp = await axios.post(
        'https://raynotes-api.herokuapp.com/signup',
        newUser,
      )
      signedUp.data.success && executeIfSignedUp(signedUp)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="signupDiv">
        <h1>Signup</h1>
        <input
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="loginInput"
          />
          <input
          value={email}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="loginInput"
          />
          <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="loginInput"
        />
        <button onClick={() => signupHandler()} className="loginBtn">
          Signup
        </button>
        <p>
          Already a user! <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  )
}
