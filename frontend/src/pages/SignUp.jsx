import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate(); // <-- Add this
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    const { username, email, password, address } = values;

    if (!username || !email || !password || !address) {
      alert('All fields are required!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:1000/api/v1/signup', values);

      if (response.status === 201 || response.status === 200) {
        alert('Signup successful!');

        // Clear input fields
        setValues({ username: '', email: '', password: '', address: '' });

        // Redirect to profile page
        navigate('/profile');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.response?.data?.error || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-6 py-6 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Sign Up</p>

        <div className='mt-4'>
          {/* Username */}
          <div className='mt-2'>
            <label className='text-zinc-400'>Username</label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='username'
              name='username'
              value={values.username}
              onChange={change}
              required
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div className='mt-4'>
            <label className='text-zinc-400'>Email</label>
            <input
              type='email'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='xyz@gmail.com'
              name='email'
              value={values.email}
              onChange={change}
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className='mt-4'>
            <label className='text-zinc-400'>Password</label>
            <input
              type='password'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='password'
              name='password'
              value={values.password}
              onChange={change}
              required
              disabled={loading}
            />
          </div>

          {/* Address */}
          <div className='mt-4'>
            <label className='text-zinc-400'>Address</label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='address'
              name='address'
              value={values.address}
              onChange={change}
              required
              disabled={loading}
            />
          </div>

          {/* Submit */}
          <div className='mt-6'>
            <button
              className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-400 transition-all'
              onClick={submit}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>

          {/* Navigation */}
          <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>
            Or
          </p>
          <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
            Already have an account?&nbsp;
            <Link to='/login' className='hover:text-blue-500'>
              <u>Login</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
