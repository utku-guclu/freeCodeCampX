import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import BarList from "./components/BarList";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";

const App: React.FC = () => {
  const isAuthenticated: any = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/bars"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/bars/:city"
          element={isAuthenticated ? <BarList /> : <Navigate to="/" replace />}
        />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
