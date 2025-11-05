// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 bg-blue-700 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-6 text-center">💼 Tracker</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="hover:bg-blue-600 px-3 py-2 rounded">Dashboard</Link>
        <Link to="/operations" className="hover:bg-blue-600 px-3 py-2 rounded">Operations</Link>
        <Link to="/profiles" className="hover:bg-blue-600 px-3 py-2 rounded">Profiles</Link>
      </nav>
    </div>
  );
}
