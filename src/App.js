import './App.css'
import { Routes, Route } from 'react-router-dom'
import { PrivacyPolicy, Homepage, CreateNote, FullNote, Signup } from './pages'
import { DoublePrivateRoute, ReversePrivateRoute } from './components'
import { useApp } from './contexts/AppContext'
import {Toaster} from 'react-hot-toast'

const App = () => {
  const { state } = useApp()
  return (
    <div className="App">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Routes>
        <DoublePrivateRoute
          login={state.loggedInToken}
          element={<Homepage />}
          path="/"
        />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/note/:id" element={<FullNote />} />
        <ReversePrivateRoute login={state.loggedInToken} path="/signup" element={<Signup />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  )
}

export default App
