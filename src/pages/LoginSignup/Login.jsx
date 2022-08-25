import './LoginSignup.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useApp } from '../../contexts/AppContext'
import { Link } from 'react-router-dom'
import { LoadingSmall } from '../../components'
import toast from 'react-hot-toast'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loader, setLoader] = useState(false)
  const { dispatch } = useApp()

  useEffect(() => {
    ; (async () => {
      const dataFromLocalStorage = JSON.parse(localStorage?.getItem('token'))
      const token = dataFromLocalStorage?.token
      if (token) {
        dispatch({ type: 'SET_LOGGEDIN_TOKEN', payload: token })
        try {
          const user = await axios.get(
            'https://raynotes-api.herokuapp.com/user',
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

  const checkCredentials = (email) => {
    if (email.includes('@') && !email.includes(' ')) {
      return true
    } else {
      toast.error('Enter a valid email.')
      return false
    }
  }

  const loginUser = async () => {
    if (checkCredentials(email)) {
      toast('Logging In!', {
        icon: '⌛',
      });
      setLoader(true)
      try {
        const loggedInRes = await axios.post(
          'https://raynotes-api.herokuapp.com/login',
          { email: email, password: password },
        )
        if (loggedInRes.data.success === true) {
          toast.success('Logged In')
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
  }
  const guestLogIn = () => {
    setEmail('prynsu@yahoo.com')
    setPassword('priyanshu')
  }
  return (
    <div className="loginSignupBox">
      <h2>Log In</h2>
      <input
        className="inputBox"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        placeholder="Password"
        type={showPass ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <label className='showPasswordChecker'>
        <input
          onChange={() => setShowPass(showPass => !showPass)}
          checked={showPass}
          type='checkbox' />
        Show Password</label>
      <button className="loginSignupBtn" onClick={() => loginUser()}>
        {loader ? <LoadingSmall /> : "Login"}
      </button>
      <button className="loginSignupBtn" onClick={() => guestLogIn()}>
        Fill Guest Credentials
      </button>
      <p>
        Not a user, <Link className='loginSignupLink' to="/signup">Signup</Link>.
      </p>
    </div>
  )
}
