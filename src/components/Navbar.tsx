'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { LogOut, User as UserIcon, LayoutDashboard, Settings } from 'lucide-react';

export default function Navbar({ user }: { user?: any }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <LayoutDashboard className="text-white" size={18} />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">
              Prime<span className="text-indigo-600">Trade</span>
            </span>
          </Link>
          
          {user && (
            <div className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                Dashboard
              </Link>
              <Link href="/dashboard/profile" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                Profile
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="flex flex-col items-end mr-1">
                <span className="text-xs font-bold text-gray-900 leading-none">{user.name}</span>
                <span className="text-[10px] text-gray-400 font-medium">Free Plan</span>
              </div>
              <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white ring-offset-1 transition-transform hover:scale-105 cursor-pointer">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
                Sign in
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
