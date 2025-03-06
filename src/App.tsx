import './App.css'

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from './pages/Login'
import Home from './pages/Home'
import BillGenerator from './pages/BillGenerator'
function App() {

  return (
    <>
      <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/bill-generator" element={<BillGenerator />} />
        </Route>

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
    </Router>
    </>
  )
}

export default App
