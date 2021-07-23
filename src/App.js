import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { PrivacyPolicy, Homepage, CreateNote, FullNote } from './pages/index'
const App = () => {
  return (
    <div className="App">
    <Link to="/">Home</Link>
    <Link to="/create-note">Create</Link>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/note/:id" element={<FullNote />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  )
}

export default App
