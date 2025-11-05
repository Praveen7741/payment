// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Operations from "./components/Operations";
import Profiles from "./components/Profiles";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div className="flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Payments Tracker
          </h1>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/profiles" element={<Profiles />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
