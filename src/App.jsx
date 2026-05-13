import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import GalleryPage from './pages/GalleryPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<GalleryPage />} />
    </Routes>
  )
}
