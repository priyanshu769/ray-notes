import './LoginSignup.css'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import { LoadingSmall } from '../../components'
import toast from 'react-hot-toast'

export const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loader, setLoader] = useState(false)
  const { dispatch } = useApp()
  const navigate = useNavigate()
  const checkCredentials = (name, email, password, rePassword) => {
    if (name.length > 3) {
      if (email.includes('@') && !email.includes(' ')) {
        if (password.length > 5) {
          if (password === rePassword) {
            return true
          } else toast.error('Passwords does not match.')
        } else {
          toast.error('Password must 6 characters or long.')
          return false
        }
      } else {
        toast.error('Enter a Valid email.')
        return false
      }
    } else {
      toast.error('Name must be greater than two characters.')
      return false
    }
  }
  const executeIfSignedUp = (signedUp) => {
    toast.success('Signed Up Successfully!')
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
    if (checkCredentials(name, email, password, rePassword)) {
      setLoader(true)
      toast('Signing You Up!', {
        icon: '⌛',
      });
      try {
        const signedUp = await axios.post(
          'https://raynotes-api.herokuapp.com/signup',
          newUser,
        )
        if(signedUp.data.success){
          executeIfSignedUp(signedUp)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className="loginSignupBox">
      <h2>Sign Up</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="inputBox"
        placeholder="Name"
        type="text"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
        placeholder="Email"
        type="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="inputBox"
        placeholder="New Password"
        type={showPass ? 'text' : 'password'}
      />
      <input
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        className="inputBox"
        placeholder="Confirm Password"
        type={showPass ? 'text' : 'password'}
      />
      <br />
      <label className='showPasswordChecker'>
        <input
          onChange={() => setShowPass(showPass => !showPass)}
          checked={showPass}
          type='checkbox' />
        Show Password</label>
      <button onClick={() => signupHandler()} className="loginSignupBtn">
        {loader ? <LoadingSmall /> : "Signup"}
      </button>
      <p>
        Already a user, <Link className='loginSignupLink' to="/">Login</Link>.
      </p>
    </div>
  )
}
