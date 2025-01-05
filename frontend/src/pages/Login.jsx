import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/authStore/index.js';

const LoginForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData))
      .then((response) => {
        if(response?.payload?.success){
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:bg-gray-100">
      <div className="bg-white p-8 md:px-12 rounded-lg md:shadow-lg w-96 md:w-2/6">
        <h1 className="text-2xl underline font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
          >
            Login
          </button>
          <p className='text-sm'>Don't have an account? <a href="/register" className='cursor-pointer mr-1 text-blue-700 underline'>Sign Up</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
