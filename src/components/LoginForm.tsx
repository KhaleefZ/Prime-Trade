'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/login', { email, password });
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 transition-transform hover:rotate-12">
          <LogIn className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
        <p className="text-gray-500 mt-2 text-center text-sm">Please enter your details to sign in</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block ml-1" htmlFor="email">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
              <Mail size={18} />
            </div>
            <input
              id="email"
              type="email"
              required
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50 hover:bg-gray-50"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-semibold text-gray-700" htmlFor="password">
              Password
            </label>
            <Link 
              href="/forgot-password" 
              className="text-xs text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
              <Lock size={18} />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              className="block w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50 hover:bg-gray-50"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20 mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-400">new to primetrade?</span>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/register" 
            className="inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline decoration-2 underline-offset-4"
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
