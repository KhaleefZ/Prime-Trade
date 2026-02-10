'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Mail, ChevronLeft, Send, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post('/api/auth/forgot-password', { email });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send reset email. Please check the email address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4 text-center">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center justify-center gap-2">
          <span>Prime</span><span className="text-indigo-600">Trade</span>
        </h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
              <Mail className="text-indigo-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
            <p className="text-gray-500 mt-2 text-center text-sm">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          {success ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center text-emerald-700">
                <CheckCircle2 size={32} className="text-emerald-500" />
                <div>
                  <p className="font-bold">Reset link sent!</p>
                  <p className="text-sm mt-1">Check your inbox for further instructions.</p>
                </div>
              </div>
              <Link
                href="/login"
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-all border border-gray-200"
              >
                Return to login
              </Link>
            </div>
          ) : (
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

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={18} />
                    Send reset link
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
