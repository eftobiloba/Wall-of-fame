import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Logo from "../../assets/logo-bw.png"


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const API_URL = process.env.REACT_APP_API_URL;

    const form_data = new FormData();
    form_data.append("username", username);
    form_data.append("password", password);

    const handleSignIn = async (evt) => {
        const data = {
            username: username,
            bio: "",
            email: email,
            name: name,
            password: password,
        }

        if (evt) {
            evt.preventDefault();
        }
        try {
            setIsLoading(true);
            const response = await axios.post(`${API_URL}/auth/register`, data)
            navigate('/login');
        } catch (error) {
            console.error('Registration failed: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <img src={Logo} alt="wall-of-fame logo" style={{"width": "60px", margin: "20px auto", borderRadius: "20px",}}/>
            <h2 className="text-2xl font-bold text-center mb-6">Become a Wall of Famer</h2>
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
                  type="text"
                  className="w-full p-3 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  required
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  className="w-full p-3 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  required
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className="text-center">Already a Wall Of Famer?
                <Link to="/login" className="text-blue-600 hover:underline"> Login</Link>
              </div>
            </form>
          </div>
        </div>
      );
};

export default Login;
