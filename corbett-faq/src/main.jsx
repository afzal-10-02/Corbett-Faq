import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AdminFaq from './AdminFaq.jsx'
import UserFaq from './UserFaq.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserFaq />} />
        <Route path="/admin/faq" element={<AdminFaq />} />
        <Route path="/faq" element={<UserFaq />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)