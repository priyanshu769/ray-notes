import './App.css'
import { Routes, Route } from 'react-router-dom'
import { PrivacyPolicy, Homepage, CreateNote, FullNote, Signup } from './pages'
import { Sidebar, DoublePrivateRoute, ReversePrivateRoute } from './components'
import { useApp } from './contexts/AppContext'

const App = () => {
  const { state } = useApp()
  return (
    <div className="App">
      <Sidebar />
      <div className="Main">
        <Routes>
          <DoublePrivateRoute
            login={state.loggedInToken}
            element={<Homepage />}
            path="/"
          />
          {/*<Route path="/" element={<Homepage />} />*/}
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/note/:id" element={<FullNote />} />
          <ReversePrivateRoute login={state.loggedInToken} path="/signup" element={<Signup />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
