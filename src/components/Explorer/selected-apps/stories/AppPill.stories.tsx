import type { Meta, StoryObj } from '@storybook/react';
import { AppPill } from '@/components/Explorer/selected-apps';

const meta: Meta<typeof AppPill> = {
  title: 'Explorer/AppPill',
  component: AppPill,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AppPill>;

const appData = {
  imgSrc: 'https://github.com/shadcn.png',
  fallback: 'ub',
  name: 'Uber',
  tagLine: 'Find no stress rides, anytime.',
  platform: 'iOS, Android',
  rating: 4.9,
  category: 'Travel & Transportation',
};

export const DefaultAppPill: Story = {
  render: () => (
    <>
      <AppPill isFull data={appData} />
      <div className="w-full flex items-center mt-4 gap-4">
        <AppPill data={appData} />
        <AppPill data={appData} />
      </div>
    </>
  ),
};

export const CompactAppPill: Story = {
  render: () => (
    <AppPill data={appData} />
  ),
};
