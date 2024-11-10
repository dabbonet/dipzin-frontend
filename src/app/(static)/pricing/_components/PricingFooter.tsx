import { Logo } from '@/components/UI/logo';
import Link from 'next/link';
import React from 'react';

const PricingFooter: React.FC = () => (
  <footer className="w-full py-8 mx-auto max-w-screen-xl lg:py-16 flex items-start justify-evenly gap-3 md:gap-8 max-sm:max-w-sm max-sm:mx-auto gap-y-8 container">
    <div className="mb-10 lg:mb-0">
      <Logo.Dipzin className="mb-3" />
      <p className="mb-8 text-lg text-slate-500 lg:max-w-xs text-center lg:text-left">Inspire Smarter Design Faster.</p>
      <Link href="https://dabbo.net" className="py-2 px-3 bg-slate-800 rounded-xl inline-flex items-center justify-center gap-1.5">
        by
        <Logo.Dabbo />
      </Link>
    </div>
    <div className="lg:mx-auto text-left">
      <ul className="text-sm  transition-all duration-500">
        <li className="mb-10">
          <Link href="/pricing" className="text-slate-50 text-2xl hover:text-slate-100 transition-colors">Pricing</Link>
        </li>
        <li className="mb-10">
          <Link href="/about" className="text-slate-50 text-2xl hover:text-slate-100 transition-colors">About</Link>
        </li>
      </ul>
    </div>
    <div className="lg:mx-auto text-left">
      <ul className="text-sm  transition-all duration-500">
        <li className="mb-10">
          <Link href="/help-center" className="text-slate-50 text-2xl hover:text-slate-100 transition-colors">Help Center</Link>
        </li>
        <li className="mb-10">
          <Link href="/terms" className="text-slate-50 text-2xl hover:text-slate-100 transition-colors">Terms & Conditions</Link>
        </li>
      </ul>
    </div>
  </footer>

);

export default PricingFooter;
