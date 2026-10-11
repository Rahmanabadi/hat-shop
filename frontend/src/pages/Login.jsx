import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { urlConsts } from "../consts"

const Login = ({ onLogin }) => {
  const [state, setState] = useState('Login')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isAdmin, setIsAdmin] = useState(false)

  const changeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate()

  const login = async e => {
    e.preventDefault()
    if (isAdmin) {
      if (
        formData.email === 'admin@example.com' &&
        formData.password === 'admin'
      ) {
        window.location.href = urlConsts.ADMIN;
      } else {
        alert('Invalid Admin credentials')
      }
    } else {
      try {
        const response = await axios.post(`${urlConsts.API}auth/login`, {
          email: formData.email,
          password: formData.password
        })

        if (response.data.isSuccessful) {
          const authToken = response.data.data.authToken
          localStorage.setItem('authToken', authToken)

          alert('Login successful!')
          onLogin()
          navigate('/')
        } else {
          alert('Login failed: ' + response.data.message)
        }
      } catch (error) {
        alert('An error occurred during login')
        console.error('Login error:', error)
      }
    }
  }

  const signup = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(`${urlConsts.API}auth/signup`, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      })

      if (response.data.isSuccessful) {
        alert('Signup successful! Your token: ' + response.data.authToken)
      } else {
        alert('Signup failed: ' + response.data.message)
      }
    } catch (error) {
      alert(
        'An error occurred during signup: ' +
          (error.response?.data?.message || error.message)
      )
      console.error('Signup error:', error)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>
          {state}
        </h1>
        <div className='space-y-4'>
          {state === 'Sign Up' && (
            <input
              type='text'
              placeholder='Your name'
              name='username'
              value={formData.username}
              onChange={changeHandler}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none'
            />
          )}
          <input
            type='email'
            placeholder='Email address'
            name='email'
            value={formData.email}
            onChange={changeHandler}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none'
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={changeHandler}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none'
          />
        </div>

        <div className='flex items-center mt-4 space-x-2'>
          <input
            type='checkbox'
            value={isAdmin}
            onChange={e => {
              setIsAdmin(Boolean(e.target.value))
            }}
            className='w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300'
          />
          <p className='text-sm text-gray-600'>
            login as admin. (admin@example.com - admin)
          </p>
        </div>

        <button
          onClick={e => {
            state === 'Login' ? login(e) : signup(e)
          }}
          className='w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none'
        >
          Continue
        </button>

        <p className='text-center text-sm text-gray-600 mt-4'>
          {state === 'Login' ? (
            <>
              Create an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className='text-blue-500 cursor-pointer hover:underline'
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className='text-blue-500 cursor-pointer hover:underline'
              >
                Login here
              </span>
            </>
          )}
        </p>

        <div className='flex items-center mt-4 space-x-2'>
          <input
            type='checkbox'
            className='w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-300'
          />
          <p className='text-sm text-gray-600'>
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
