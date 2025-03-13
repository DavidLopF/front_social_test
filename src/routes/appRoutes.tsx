import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
// import Profile from '../pages/Profile';
import Register from '../pages/Register';
// import Publications from '../pages/Publications'; // Si tienes otra página

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="/publications" element={<Publications />} /> */}
        {/* Cualquier ruta no definida redirige a la raíz */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
