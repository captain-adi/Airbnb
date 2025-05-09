import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUP = async (e) => {
    try {
      
      e.preventDefault();
      const response = await axios.post("/api/user/signup", {
        username,
        email,
        password,
      });
      console.log("response is : ", response);
      setEmail("");
      setPassword("");
      setUserName("");
      if(response.ok){
        navigate('/login')
      }
    } catch (error) {
      throw new Error("signup fail");
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
          Create Your Account
        </h2>
        <form className="space-y-5" onSubmit={handleSignUP}>
          {/* <!-- Name Field --> */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              User Name
            </label>
            <input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              id="name"
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
              required
            />
          </div>

          {/* <!-- Email Field --> */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
              required
            />
          </div>

          {/* <!-- Password Field --> */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
              required
            />
          </div>

          {/* <!-- Submit Button --> */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-sm transition-all focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Sign Up
            </button>
          </div>

          {/* <!-- Already have an account --> */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
