import './App.css'
import { Routes, Route } from 'react-router-dom'
import { PrivacyPolicy, Notes } from './pages/index'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  )
}

export default App
