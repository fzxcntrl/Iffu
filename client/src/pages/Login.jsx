import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const { login, userInfo, error, loading } = useAuthStore();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 p-8"
      >
        <h1 className="text-3xl font-heading font-bold uppercase tracking-tighter mb-8 text-center">Sign In</h1>
        
        {error && <div className="bg-red-900/20 text-red-500 p-4 border border-red-900 mb-6 text-sm text-center">{error}</div>}
        
        <form onSubmit={submitHandler} className="space-y-6">
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

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black py-4 uppercase tracking-widest font-bold text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          New to Iffu?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-white hover:underline underline-offset-4">
            Create an account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
