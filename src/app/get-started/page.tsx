'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowLeft,
  Loader2,
  Package,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('plan') || 'pro';
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);

  const planDetails: any = {
    starter: { name: 'Starter Plan', price: '₹1,200', color: 'text-emerald-600' },
    pro: { name: 'Pro Trader', price: '₹2,000', color: 'text-indigo-600' },
    enterprise: { name: 'Elite Plan', price: '₹9,900', color: 'text-amber-600' }
  };

  const selectedPlan = planDetails[planId] || planDetails.pro;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/user/profile');
        setUser(res.data.user);
      } catch (e) {
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Simulate payment processing (delay)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 2. Actually update the user plan in the database
      await axios.put('/api/user/plan', { plan: planId });
      
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Payment authorization failed');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <CheckCircle2 size={48} className="text-emerald-500" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Payment Successful!</h1>
        <p className="text-gray-500 max-w-md text-lg font-medium leading-relaxed">
          Welcome to the <span className={selectedPlan.color}>{selectedPlan.name}</span> membership. Your account is being upgraded as we speak.
        </p>
        <div className="mt-12 flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
          <Loader2 className="animate-spin" size={16} />
          Redirecting to your dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-2xl font-black tracking-tight group">
            <span className="text-gray-900">Prime</span><span className="text-indigo-600 group-hover:translate-x-0.5 transition-transform">Trade</span>
          </Link>
          <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Lock size={14} /> SSL Secure</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Checkout Info */}
          <div className="flex-1">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-indigo-600 transition-colors mb-10 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Cancel and return
            </Link>

            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Complete your <span className="text-indigo-600">Upgrade</span></h1>
            <p className="text-gray-500 font-medium mb-12">Set up your payment method to unlock professional trading tools instantly.</p>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                  <Package size={80} />
                </div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">Selected Plan</span>
                    <h3 className={`text-2xl font-black mt-3 ${selectedPlan.color}`}>{selectedPlan.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-gray-900">{selectedPlan.price}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">per month</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-2 rounded-xl inline-flex">
                  <Sparkles size={14} />
                  Includes all Pro features & 24/7 Support
                </div>
              </div>

              {/* Mock Form */}
              <form onSubmit={handlePayment} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <CreditCard size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Payment Details</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="4242 4242 4242 4242" 
                        required
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl px-5 py-4 font-bold outline-none transition-all placeholder:text-gray-300"
                      />
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2">
                        <div className="w-8 h-5 bg-gray-200 rounded" />
                        <div className="w-8 h-5 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Expiry Date</label>
                    <input type="text" placeholder="MM / YY" required className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl px-5 py-4 font-bold outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">CVC / CVV</label>
                    <input type="text" placeholder="•••" required className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl px-5 py-4 font-bold outline-none transition-all" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-gray-200 relative overflow-hidden group disabled:opacity-70"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="animate-spin" size={24} />
                      Processing Security...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      Authorize Payment
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm sticky top-12">
              <h4 className="text-xl font-black text-gray-900 mb-8">Order Summary</h4>
              <div className="space-y-4 pb-8 border-b border-gray-50">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">{selectedPlan.name} (Monthly)</span>
                  <span className="text-gray-900 font-bold">{selectedPlan.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Platform Fee</span>
                  <span className="text-emerald-500 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Tax</span>
                  <span className="text-gray-900 font-bold">₹0.00</span>
                </div>
              </div>
              <div className="py-6 flex justify-between items-center mb-8">
                <span className="text-lg font-black text-gray-900">Total</span>
                <span className="text-2xl font-black text-indigo-600">{selectedPlan.price}</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                <div className="flex gap-3">
                  <ShieldCheck className="text-emerald-500 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-1">Guaranteed Security</p>
                    <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Your data is protected by 256-bit AES encryption.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-bold animate-pulse">Initializing Checkout...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
