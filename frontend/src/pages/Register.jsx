import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/authStore/index.js';

const RegistrationForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    hobby: [],
  });

  const hobbyOptions = ['Reading', 'Gaming', 'Traveling', 'Cooking', 'Sports'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHobbyChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedHobby = checked
        ? [...prevData.hobby, value]
        : prevData.hobby.filter((hobby) => hobby !== value);
      return { ...prevData, hobby: updatedHobby };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    dispatch(registerUser(formData))
      .then((response) => {
        if(response?.payload?.success){

          navigate('/login');

        }
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });

  };

  return (
    <div className="min-h-screen flex items-center justify-center md:bg-gray-100">
      <div className="bg-white p-8 md:px-12 rounded-lg md:shadow-lg w-96 md:w-2/6">
        <h1 className="text-2xl underline font-bold mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>
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
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {hobbyOptions.map((hobby, index) => (
                <div key={index} className="flex items-center mr-2">
                  <input
                    type="checkbox"
                    id={`hobby-${index}`}
                    value={hobby}
                    checked={formData.hobby.includes(hobby)}
                    onChange={handleHobbyChange}
                    className="mr-1"
                  />
                  <label htmlFor={`hobby-${index}`} className="text-gray-700">
                    {hobby}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
          >
            Submit
          </button>

          <p className='text-sm'>Already have an acount <a href="/login" className='cursor-pointer mr-1 text-blue-700 underline'>Login</a></p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
