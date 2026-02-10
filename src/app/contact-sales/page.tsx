'use client';

import { useState } from 'react';
import axios from 'axios';
import { 
  ArrowLeft, 
  Send, 
  MessageSquare, 
  Globe, 
  Users, 
  CheckCircle2, 
  Building2,
  Mail,
  Loader2,
  PhoneCall
} from 'lucide-react';
import Link from 'next/link';

export default function ContactSalesPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectDetails: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contact', formData);
      setLoading(false);
      setSuccess(true);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to send inquiry');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 -z-10 hidden lg:block" />

      <nav className="px-8 py-6 border-b border-gray-50 bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-2xl font-black tracking-tight group">
            <span className="text-gray-900">Prime</span><span className="text-indigo-600 group-hover:translate-x-0.5 transition-transform">Trade</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <PhoneCall size={14} className="text-indigo-600" />
              +1 (888) PRIMETRADE
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Left Column: Content */}
          <div className="flex-1 max-w-2xl">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-indigo-600 transition-colors mb-12 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to plans
            </Link>
            
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-[1.1] mb-8">
              Let's build your <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Enterprise</span> solution.
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12">
              Join 500+ global trading firms using PrimeTrade to automate their workflows, manage risk, and scale institutional performance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-t border-gray-100 pt-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Global Scale</h4>
                  <p className="text-sm text-gray-500 font-medium">Distributed infrastructure support for high-frequency trading.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Dedicated Team</h4>
                  <p className="text-sm text-gray-500 font-medium">Get a dedicated success manager and 24/7 technical priority.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
               <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white overflow-hidden shadow-sm">
                     <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                   </div>
                 ))}
               </div>
               <p className="text-sm text-gray-500 font-bold">
                 Joined by over <span className="text-indigo-600">12,000+</span> traders this month.
               </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-full lg:w-[500px] flex-shrink-0">
            {success ? (
              <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-2xl text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Inquiry Received</h2>
                <p className="text-gray-500 font-medium text-lg leading-relaxed mb-10">
                  Thanks for reaching out! One of our enterprise specialists will contact you within the next 2 hours.
                </p>
                <Link 
                  href="/dashboard"
                  className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                >
                  Return to Dashboard
                </Link>
              </div>
            ) : (
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl relative">
                <div className="flex items-center gap-3 mb-10">
                   <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                     <Building2 size={24} />
                   </div>
                   <h3 className="text-2xl font-black text-gray-900 tracking-tight">Partner with Us</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">First Name</label>
                      <input 
                        required 
                        type="text" 
                        className="w-full bg-gray-50 border-transparent border-2 focus:border-indigo-500/20 focus:bg-white rounded-2xl px-5 py-4 font-bold outline-none transition-all placeholder:text-gray-300" 
                        placeholder="John" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Last Name</label>
                      <input 
                        required 
                        type="text" 
                        className="w-full bg-gray-50 border-transparent border-2 focus:border-indigo-500/20 focus:bg-white rounded-2xl px-5 py-4 font-bold outline-none transition-all placeholder:text-gray-300" 
                        placeholder="Doe" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      <input 
                        required 
                        type="email" 
                        className="w-full bg-gray-50 border-transparent border-2 focus:border-indigo-500/20 focus:bg-white rounded-2xl pl-12 pr-5 py-4 font-bold outline-none transition-all placeholder:text-gray-300" 
                        placeholder="john@company.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Project Details</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-5 top-5 text-gray-300" size={18} />
                      <textarea 
                        required 
                        rows={4} 
                        className="w-full bg-gray-50 border-transparent border-2 focus:border-indigo-500/20 focus:bg-white rounded-2xl pl-12 pr-5 py-4 font-bold outline-none transition-all placeholder:text-gray-300 resize-none" 
                        placeholder="Tell us about your trading volume or specific needs..." 
                        value={formData.projectDetails}
                        onChange={(e) => setFormData({...formData, projectDetails: e.target.value})}
                      />
                    </div>
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 group"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={24} />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Submit Inquiry
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-gray-400 font-bold text-center leading-relaxed px-4 uppercase tracking-widest">
                    By submitting, you agree to our <span className="text-indigo-600">Privacy Policy</span> and enterprise service terms.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

