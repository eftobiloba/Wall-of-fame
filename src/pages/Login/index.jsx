import React, { useState, useContext } from 'react';
import authService from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { AuthApi, TokenApi } from '../../App';
import { toast } from "react-toastify";
import Logo from "../../assets/logo-bw.png"

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthApi);
  const { setToken } = useContext(TokenApi);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (evt) => {
    if (evt) {
      evt.preventDefault();
    }
    setIsLoading(true);
    try {
      const form_data = new FormData();
      form_data.append("username", username);
      form_data.append("password", password);

      const response = await authService.login(form_data);

      // Check if response is successful
      if (response && response.status === 200) {
        setAuth(true);
        setToken(response.data.access_token);
        navigate('/');
      }
    } catch (error) {
      toast.error("Invalid username or password");
      console.error('Login failed: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <img src={Logo} alt="wall-of-fame logo" style={{"width": "60px", margin: "20px auto", borderRadius: "20px",}}/>
        <h2 className="text-2xl font-bold text-center mb-6">Login to Wall Of Fame</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              required
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full p-3 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isLoading === false && (
            <div className="mb-4">
              <input
                type="submit"
                value="Submit"
                className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              />
            </div>
          )}
          {isLoading === true && (
            <div className="flex justify-center">
              <div className="btn-loader">Loading...</div>
            </div>
          )}
          <div className="text-center">Not yet a Wall Of Famer?
            <Link to="/register" className="text-blue-600 hover:underline"> Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
