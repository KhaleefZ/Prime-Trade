'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, Loader2, User } from 'lucide-react';

export default function RegisterForm() {
  const [name, setName] = useState('');
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
      await axios.post('/api/auth/register', { name, email, password });
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 transition-transform hover:scale-110">
          <UserPlus className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h2>
        <p className="text-gray-500 mt-2 text-center text-sm">Join PrimeTrade and start managing tasks</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block ml-1" htmlFor="name">
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
              <User size={18} />
            </div>
            <input
              id="name"
              type="text"
              required
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all placeholder:text-gray-400 text-gray-900 bg-gray-50/50 hover:bg-gray-50"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

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
          <label className="text-sm font-semibold text-gray-700 block ml-1" htmlFor="password">
            Password
          </label>
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
          <p className="text-[10px] text-gray-400 ml-1">Must be at least 8 characters with numbers & symbols</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20 mt-4"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              Creating account...
            </>
          ) : (
            'Get Started'
          )}
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline decoration-2 underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
