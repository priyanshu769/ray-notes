import './App.css'
import { Routes, Route } from 'react-router-dom'
import { PrivacyPolicy, Homepage, CreateNote, FullNote } from './pages'
import { Sidebar } from './components'

const App = () => {
  return (
    <div className="App">
    <Sidebar />
    <div className="Main">
    <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/create-note" element={<CreateNote />} />
    <Route path="/note/:id" element={<FullNote />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
    </div>
    </div>
  )
}

export default App
