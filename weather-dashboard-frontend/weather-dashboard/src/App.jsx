import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // 👈 new import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* 👈 new route */}
        
        {/* Temporary home route */}
        <Route path="/" element={<h1 className="text-center mt-10">Weather Dashboard</h1>} />
      </Routes>
    </Router>
  );
}

export default App;