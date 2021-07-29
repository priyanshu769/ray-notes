import './LoginSignup.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useApp } from '../../contexts/AppContext'
import { Link } from 'react-router-dom'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { dispatch } = useApp()

  useEffect(() => {
    ;(async () => {
      const dataFromLocalStorage = JSON.parse(localStorage?.getItem('token'))
      const token = dataFromLocalStorage?.token
      if (token) {
        dispatch({ type: 'SET_LOGGEDIN_TOKEN', payload: token })
        try {
          const user = await axios.get(
            'http://raynotes-api.herokuapp.com/user',
            {
              headers: { Authorization: token },
            },
          )
          if (user.data.success) {
            dispatch({
              type: 'SET_PROFILE',
              payload: {
                userId: user.data.user._id,
                name: user.data.user.name,
              },
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
    })()
  }, [dispatch])

  const loginUser = async () => {
    try {
      const loggedInRes = await axios.post(
        'https://raynotes-api.herokuapp.com/login',
        { email: email, password: password },
      )
      if (loggedInRes.data.success === true) {
        dispatch({
          type: 'SET_PROFILE',
          payload: {
            userId: loggedInRes.data.user._id,
            name: loggedInRes.data.user.name,
          },
        })
        dispatch({
          type: 'SET_LOGGEDIN_TOKEN',
          payload: loggedInRes.data.token,
        })
        localStorage.setItem(
          'token',
          JSON.stringify({ token: loggedInRes.data.token }),
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="loginContainer">
      <div className="loginDiv">
        <h1>Login</h1>
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
        <button onClick={loginUser} className="loginBtn">
          Login
        </button>
        <hr />
        <p>
          New to Ray Notes? <Link to="signup">Signup</Link>!
        </p>
      </div>
    </div>
  )
}
