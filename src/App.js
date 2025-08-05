import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Router>
      <Nav className="bg-dark text-white px-4 py-2 justify-content-between align-items-center shadow-sm">
        <div className="fw-bold text-warning">🧵 ShreeJi Clothing</div>
        <div>
          <Link to="/" className="text-white me-4 text-decoration-none">Home</Link>
          <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
        </div>
      </Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
