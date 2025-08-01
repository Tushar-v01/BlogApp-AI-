import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {axios, setToken}  = useAppContext();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // Your login logic
    try {
      const {data} = await axios.post('/api/admin/login', {email, password});
    if(data.success){
      setToken(data.token)
      localStorage.setItem('token', data.token)
      axios.defaults.headers.common['Authorization'] = data.token;
    }
    else{
      toast.error(data.message);
    }
      
    } catch (error) {
      toast.error(error.message);
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border border-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="text-primary">Admin</span> Login
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700">Email</label>
            <input
              type="email"
              required
              placeholder="your email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700">Password</label>
            <input
              type="password"
              required
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <button
            type="submit"
            className=" cursor-pointer w-full bg-primary hover:bg-primary/90 transition-all text-white font-semibold py-2 rounded-lg shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
