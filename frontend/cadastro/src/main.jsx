import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Home from './pages/home/index.jsx'
import Login from './pages/login/index.jsx'
import Foto from './pages/foto/index.jsx' // <-- nova página

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        <Route path="/foto" element={
          <PrivateRoute>
            <Foto />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
