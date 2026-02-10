'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Check, Target, Zap, Crown, ShieldCheck, ArrowRight } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹1200',
    description: 'Perfect for individual traders beginning their journey.',
    features: ['Up to 5 active tasks', 'Basic analytics dashboard', 'Daily performance email', 'Community support'],
    icon: <Target className="text-emerald-500" size={24} />,
    color: 'emerald'
  },
  {
    id: 'pro',
    name: 'Pro Trader',
    price: '₹2,000',
    description: 'Advanced tools for serious traders and analysts.',
    features: ['Unlimited active tasks', 'Real-time market signals', 'Advanced risk management', 'Priority email support', 'Custom task filters'],
    icon: <Zap className="text-indigo-500" size={24} />,
    color: 'indigo',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Elite',
    price: '₹9,900',
    description: 'Tailored for professional trading groups and whales.',
    features: ['Custom API access', 'Dedicated account manager', 'Institutional-grade security', 'Whale wallet tracking', 'Personalized strategy consults'],
    icon: <Crown className="text-amber-500" size={24} />,
    color: 'amber'
  }
];

export default function PlanExplorer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-8 pb-0 flex justify-between items-start">
          <div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full mb-2 inline-block">
              Premium Subscription
            </span>
            <h2 className="text-3xl font-black text-gray-900 leading-tight">
              Unlock the Edge with <span className="text-indigo-600">Prime</span>Trade Pro
            </h2>
            <p className="text-gray-500 mt-2">Choose the plan that fits your trading style and elevate your productivity.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Plans Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative rounded-3xl p-6 border-2 transition-all duration-300 group flex flex-col ${
                plan.popular 
                ? 'border-indigo-600 shadow-xl shadow-indigo-100 bg-indigo-50/5' 
                : 'border-gray-100 hover:border-gray-300 bg-white hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black uppercase px-4 py-1 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 ${
                  plan.color === 'emerald' ? 'bg-emerald-50' : 
                  plan.color === 'indigo' ? 'bg-indigo-50' : 'bg-amber-50'
                }`}>
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm">/month</span>
                </div>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-indigo-50 flex items-center justify-center">
                      <Check className="text-indigo-600" size={10} strokeWidth={4} />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href={`/get-started?plan=${plan.id}`}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  plan.popular 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            <ShieldCheck size={16} className="text-indigo-600" />
            Secure billing powered by Stripe
          </div>
          <div className="text-sm text-gray-500">
            Need a custom solution? <Link href="/contact-sales" className="text-indigo-600 font-bold hover:underline">Contact Sales</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
