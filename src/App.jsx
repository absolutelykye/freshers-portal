import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import ClubsPage from './pages/ClubsPage.jsx'
import FAQPage from './pages/FAQpage';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/clubs" element={<ClubsPage />} />
      <Route path="/faqs" element={<FAQPage />} />
    </Routes>
  )
}


