'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import PlanExplorer from '@/components/PlanExplorer';
import { 
  User as UserIcon, 
  Mail, 
  Shield, 
  ArrowLeft, 
  Save, 
  Camera,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/user/profile');
      setUser(res.data.user);
      setFormData({
        name: res.data.user.name,
        email: res.data.user.email,
      });
    } catch (error) {
      console.error('Failed to fetch profile', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await axios.put('/api/user/profile', { name: formData.name });
      setUser(res.data.user);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Update failed' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-bold animate-pulse">Loading Account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar user={user} />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-indigo-600 transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-black shadow-xl ring-4 ring-white ring-offset-2">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg border-2 border-white hover:bg-indigo-700 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">{user?.name}</h2>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{user?.email}</p>
              
              <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400 px-2">
                  <span>Account Status</span>
                  <span className="text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400 px-2">
                  <span>Plan Type</span>
                  <span className="text-indigo-600">Enterprise Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Shield size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none">Account Security</h1>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Personal identity configuration</p>
                </div>
              </div>

              <form onSubmit={handleUpdate} className="space-y-8">
                {message.text && (
                  <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                    {message.text}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                      <UserIcon size={14} /> Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl px-5 py-4 text-gray-900 font-bold placeholder:text-gray-300 outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                      <Mail size={14} /> Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 text-gray-400 font-bold outline-none cursor-not-allowed"
                      value={formData.email}
                      disabled
                    />
                    <p className="text-[10px] text-gray-400 font-medium mt-2 ml-1">Email cannot be changed for security reasons.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving || formData.name === user?.name}
                    className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50 disabled:shadow-none"
                  >
                    {saving ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save size={18} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 -mr-20 -mt-20 bg-white/10 rounded-full blur-3xl" />
               <div className="relative z-10">
                 <h3 className="text-xl font-black mb-2">Upgrade to Prime Pro</h3>
                 <p className="text-white/80 font-medium text-sm mb-6 max-w-xs">Get unlimited tasks, collaborative boards, and advanced insights.</p>
                 <button 
                   onClick={() => setIsPlanOpen(true)}
                   className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg shadow-black/10"
                 >
                   Explore Plans
                 </button>
               </div>
            </div>
          </div>
        </div>
      </main>

      <PlanExplorer 
        isOpen={isPlanOpen} 
        onClose={() => setIsPlanOpen(false)} 
      />
    </div>
  );
}
