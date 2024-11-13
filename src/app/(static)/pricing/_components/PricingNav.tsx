import { Button } from '@/components/Shared/button';
import { Logo } from '@/components/UI/logo';
import React from 'react';

const PricingNav: React.FC = () => (
  <nav className="w-full h-fit py-9 px-8 flex items-center justify-between gap-2">
    <Logo.Dipzin className="flex mr-auto" />
    <Button size="sm" className="w-28">
      Join Us
    </Button>
  </nav>
);

export default PricingNav;
