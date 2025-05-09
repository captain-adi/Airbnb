import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/store";

function Login() {
  const navigate = useNavigate();
const { setLoggedInUser} = useContext(Context)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setLoggedInUser(1);
        navigate("/")
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <form
      className="max-w-md mx-auto mt-12 p-8 bg-gray-100 rounded-lg shadow-md flex flex-col gap-6"
      onSubmit={handleLogin}
    >
      <div className="flex flex-col">
        <label htmlFor="email" className="text-gray-700 mb-1">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="Enter your email"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="text-gray-700 mb-1">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="*******"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all duration-300"
      >
        Submit
      </button>
    </form>
  );
}

export default Login;
