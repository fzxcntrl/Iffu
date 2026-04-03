import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { register, userInfo, error, loading } = useAuthStore();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(null);
      register(name, email, password);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 p-8"
      >
        <h1 className="text-3xl font-heading font-bold uppercase tracking-tighter mb-8 text-center">Create Account</h1>
        
        {message && <div className="bg-red-900/20 text-red-500 p-4 border border-red-900 mb-6 text-sm text-center">{message}</div>}
        {error && <div className="bg-red-900/20 text-red-500 p-4 border border-red-900 mb-6 text-sm text-center">{error}</div>}
        
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Name</label>
            <input 
              type="text" 
              placeholder="Enter name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-white/20 p-4 text-white focus:outline-none focus:border-white transition-colors font-mono text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="Enter email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/20 p-4 text-white focus:outline-none focus:border-white transition-colors font-mono text-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/20 p-4 text-white focus:outline-none focus:border-white transition-colors font-mono text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-black border border-white/20 p-4 text-white focus:outline-none focus:border-white transition-colors font-mono text-sm"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black py-4 uppercase tracking-widest font-bold text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Register'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-white hover:underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
