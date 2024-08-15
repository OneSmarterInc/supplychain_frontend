import React, { useState } from 'react';
import backgroundImage from "../Assets/register-page-img.png";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-end">
        <a href="/" className="text-gray-500 hover:text-gray-700">
          Already have an Flex account? Log In
        </a>
      </div>
      <h2 className="text-2xl font-bold mb-4">Register with your e-mail</h2>
      <p className="text-gray-600 mb-6">
        Please enter your e-mail address and a password to start the registration process. You will
        receive a confirmation e-mail to activate your account.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email / Username *
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={handleEmailChange}
            placeholder="Ex: graham@yesenia.net"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password *
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={handlePasswordChange}
            placeholder="**********"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
      <div className="mt-8">
        <img
          src={backgroundImage} // Replace with your actual image URL
          alt="Register Benefits"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Register;