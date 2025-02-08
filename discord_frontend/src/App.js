import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./component/authPages/LoginPage/LoginPage.component";
import RegisterPage from "./component/authPages/RegisterPage/RegisterPage.component";
import Dashboard from "./component/Dashboard/Dashboard.component";
import AlertNotification from "./component/shared/components/AlertNotification.component";

function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <AlertNotification />
      </>
    </div>
  );
}

export default App;
