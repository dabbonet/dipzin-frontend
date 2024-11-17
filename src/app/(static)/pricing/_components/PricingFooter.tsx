import { Logo } from '@/components/UI/logo';
import Link from 'next/link';
import React from 'react';

const PricingFooter: React.FC = () => (
  <footer className="w-full py-8 mx-auto max-w-screen-xl lg:py-16 flex flex-col sm:flex-row items-start justify-evenly gap-3 md:gap-8 max-sm:max-w-sm max-sm:mx-auto gap-y-8 container">
    <div className="mb-10 lg:mb-0">
      <Logo.Dipzin className="mb-3" />
      <p className="mb-8 text-lg text-slate-500 lg:max-w-xs text-left">Inspire Smarter Design Faster.</p>
      <Link href="https://dabbo.net" className="py-2 px-3 bg-slate-800 rounded-xl inline-flex items-center justify-center gap-1.5">
        by
        <Logo.Dabbo />
      </Link>
    </div>
    <div className="flex flex-col gap-6">
      <Link href="/pricing" className="text-slate-50 text-2xl hover:text-slate-100 transition-colors">Pricing</Link>
      <Link href="/about" className="text-slate-50 text-2xl hover:text-slate-100 transition-colors">About</Link>
    </div>
    <div className="flex flex-col gap-6">
      <Link href="/help-center" className="text-slate-50 text-2xl hover:text-slate-100 transition-colors">Help Center</Link>
      <Link href="/terms" className="text-slate-50 text-2xl hover:text-slate-100 transition-colors">Terms & Conditions</Link>
    </div>
  </footer>

);

export default PricingFooter;
