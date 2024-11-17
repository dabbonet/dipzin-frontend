import { Button } from '@/components/Shared/button';
import { Logo } from '@/components/UI/logo';
import React from 'react';

const PricingNav: React.FC = () => (
  <nav className="w-full h-fit px-4 pt-5 md:px-8 md:pt-7 flex items-center justify-between gap-2">
    <a href="/" aria-label="Home">
      <Logo.Dipzin className="text-white" />
    </a>
    <Button size="sm" className="w-28">
      Join Us
    </Button>
  </nav>
);

export default PricingNav;
