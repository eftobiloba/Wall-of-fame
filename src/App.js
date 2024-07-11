import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Logout from './pages/logout';
import React, { useState, useEffect, createContext } from 'react';
import Cookies from "js-cookie";
import HomePage from './pages/HomePage';

// Create contexts
export const AuthApi = createContext();
export const TokenApi = createContext();

function App() {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");

  // Function to read the cookie
  const readCookie = () => {
    let token = Cookies.get("login_credentials");
    if (token) {
      setAuth(true);
      setToken(token);
    }
  };

  // UseEffect to read cookie on initial render
  useEffect(() => {
    readCookie();
  }, []);

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <TokenApi.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <AllRoutes />
        </BrowserRouter>
      </TokenApi.Provider>
    </AuthApi.Provider>
  );
}

// Define all routes
const AllRoutes = () => {
  const { auth } = React.useContext(AuthApi);
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute auth={auth} component={Home} />} />
      <Route path="/login" element={<ProtectedLogin auth={auth} component={Login} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/fame/:username" element={<Dashboard />} />
    </Routes>
  );
};

// ProtectedRoute component
const ProtectedRoute = ({ auth, component: Component }) => {
  return (auth ? <Component /> : <Navigate to="/login" />);
};

// ProtectedLogin component
const ProtectedLogin = ({ auth, component: Component }) => {
  return (!auth ? <Component /> : <Navigate to="/" />);
};

export default App;
