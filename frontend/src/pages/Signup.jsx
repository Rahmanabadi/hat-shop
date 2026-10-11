import React, { useState } from 'react';
import axios from 'axios';
import { urlConsts } from "../consts"

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${urlConsts.API}auth/signup`, {
        username,
        email,
        password,
      });

      if (response.data.isSuccessful) { 
        alert('Signup successful! Your token: ' + response.data.authToken); 
      } else {
        alert('Signup failed: ' + response.data.message); 
      }
    } catch (error) {
      alert('An error occurred during signup: ' + (error.response?.data?.message || error.message));
      console.error('Signup error:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;

