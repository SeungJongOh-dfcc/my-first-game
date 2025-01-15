import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import RegisterPage from '@/pages/RegisterPage'

const Router = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
