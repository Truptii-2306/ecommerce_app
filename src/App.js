import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import { ProtectedRoute } from "./protectedRoute";

function App() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user && user.expTime) {
    const currentTime = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if (currentTime - user.expTime > twentyFourHours) {
      localStorage.removeItem("loggedInUser");
    }
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/register" element={<RegistrationForm />} />
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/"
          element={
            user ? <Navigate to="my-profile" /> : <Navigate to="auth/login" />
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
