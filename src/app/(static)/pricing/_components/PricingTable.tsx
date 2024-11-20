import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/UI/table";
import { Button } from "@/components/Shared/button";
import { Icon } from '@/components/UI/icon';

export interface Checkout {
  unit_amount: number;
  recurring: {
    interval: 'day' | 'week' | 'month' | 'year';
    interval_count: number;
  };
  id?: string;
}

interface PricingTableProps {
  checkout: Checkout;
  currentPlan?: 'free' | 'personal' | 'team';
}

const renderCellContent = (value: boolean | string) => {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="size-6 flex items-center justify-center mx-auto rounded-[6px] bg-aqua-600">
        <Icon.Check className="size-3.5 text-aqua-100" />
      </span>
    ) : (
      <Icon.XCircleIcon className="size-5 mx-auto text-slate-500 rounded-full" />
    );
  }
  return (
    <p className="text-center text-lg font-medium">
      {value}
    </p>
  )
};

interface PlanButtonProps {
  plan: 'free' | 'personal' | 'team';
  currentPlan: 'free' | 'personal' | 'team';
}

const PlanButton: React.FC<PlanButtonProps> = ({ plan, currentPlan }) => {
  if (plan === currentPlan) {
    return <Button variant="darkGray" size="xl">Current Plan</Button>;
  }
  return <Button variant="default" size="xl">Select Plan</Button>;
};

const PricingTable: React.FC<PricingTableProps> = ({ checkout, currentPlan = 'free' }) => {
  const features = [
    {
      name: "All Apps Access", free: true, personal: true, team: true
    },
    {
      name: "Latest Version", free: true, personal: true, team: true
    },
    {
      name: "Image Copy & Download", free: true, personal: true, team: true
    },
    {
      name: "Bulk download", free: "Limited", personal: true, team: true
    },
    {
      name: "Flows", free: "Limited", personal: "Unlimited", team: "Unlimited", soon: true
    },
    {
      name: "Search and Filters", free: "Limited", personal: "Unlimited", team: "Unlimited"
    },
    {
      name: "Collections", free: "Limited", personal: "Unlimited", team: "Unlimited"
    },
    {
      name: "Team Members", free: false, personal: false, team: true
    },
    {
      name: "Team Collections", free: false, personal: false, team: true
    },
    {
      name: "Centralized Billing", free: false, personal: false, team: true
    },
    {
      name: "Seat-based Pricing", free: false, personal: false, team: true
    },
  ];

  return (
    <Table className="py-8 mx-auto max-w-screen-2xl lg:py-16 text-slate-100 ">
      <TableHeader>
        <TableHead className="w-1/4 text-left align-bottom sm:w-1/3 lg:w-1/4">
          <h1 className="text-[40px] font-semibold leading-[56px] text-slate-100">
            Plan
            <br />
            {' '}
            Comparison
          </h1>
          <p className="text-lg text-slate-400">Find your best subscription.</p>
        </TableHead>
        <TableHead className="w-1/4 text-start sm:w-1/3 lg:w-1/4">
          <div className="flex flex-col items-center gap-4">
            <span className="space-y-2">
              <h5 className="text-slate-100 text-2xl font-semibold">Free</h5>
              <h4 className="text-slate-100 font-semibold text-[32px]">
                $0.00
                {' '}
                <span className="text-slate-400 text-base">/month</span>
              </h4>
            </span>
            <PlanButton plan="free" currentPlan={currentPlan} />
          </div>
        </TableHead>
        <TableHead className="w-1/4 text-start sm:w-1/3 lg:w-1/4">
          <div className="flex flex-col items-center gap-4">
            <span className="space-y-2">
              <h5 className="text-slate-100 text-xl">Personal</h5>
              <h4 className="text-slate-100 font-semibold text-2xl mb-5">
                $
                {checkout.unit_amount / 100}
                <span className="text-slate-400 text-base">
                  /
                  {checkout.recurring.interval}
                </span>
              </h4>
            </span>
            <PlanButton plan="personal" currentPlan={currentPlan} />
          </div>
        </TableHead>
        <TableHead className="w-1/4 text-start sm:w-full lg:w-1/4">
          <div className="flex flex-col items-center text-start space-y-2">
            <h5 className="text-slate-100 font-semibold text-2xl">Team</h5>
            <h4 className="text-slate-100 font-semibold text-[40px] leading-[53px]">
              Coming
              <br />
              Soon
            </h4>
          </div>
        </TableHead>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="w-1/4 py-5 pt-14 text-2xl font-semibold sm:w-1/3 lg:w-1/4">Features</TableCell>
          <TableCell className="w-1/4 sm:w-1/3 lg:w-1/4" />
          <TableCell className="w-1/4 sm:w-1/3 lg:w-1/4" />
          <TableCell className="w-1/4 sm:w-full lg:w-1/4" />
        </TableRow>
        {features.map((feature) => (
          <TableRow key={feature.name}>
            <TableCell className="w-1/4 py-5 px-2 text-lg font-medium sm:w-1/3 lg:w-1/4">{feature.name}</TableCell>
            <TableCell className="w-1/4 sm:w-1/3 lg:w-1/4">{renderCellContent(feature.free)}</TableCell>
            <TableCell className="w-1/4 sm:w-1/3 lg:w-1/4">{renderCellContent(feature.personal)}</TableCell>
            <TableCell className="w-1/4 sm:w-full lg:w-1/4">{renderCellContent(feature.team)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PricingTable
