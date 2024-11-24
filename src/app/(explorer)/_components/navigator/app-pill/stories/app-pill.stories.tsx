import type { Meta, StoryObj } from '@storybook/react';
import { AppPill } from '@/app/(explorer)/_components/navigator/app-pill';

const meta: Meta<typeof AppPill> = {
  title: 'Explorer/AppPill',
  component: AppPill,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AppPill>;

const appData = {
  id: 1,
  name: 'Uber',
  tagLine: 'Find no stress rides, anytime.',
  platform: 'iOS, Android',
  category: 'Travel & Transportation',
  slug: 'uber',
  icon: 'https://github.com/shadcn.png',
  categories: ['Travel', 'Transportation'],
};

export const DefaultAppPill: Story = {
  render: () => (
    <>
      <AppPill
        isFull
        data={appData}
        isHidden={false}
        onToggleVisibility={() => {}}
        onRemove={() => {}}
      />
      <div className="w-full flex items-center mt-4 gap-4">
        <AppPill
          data={appData}
          isHidden={false}
          onToggleVisibility={() => {}}
          onRemove={() => {}}
        />
        <AppPill
          data={appData}
          isHidden={false}
          onToggleVisibility={() => {}}
          onRemove={() => {}}
        />
      </div>
    </>
  ),
};

export const CompactAppPill: Story = {
  render: () => (
    <AppPill
      isHidden={false}
      onToggleVisibility={() => {}}
      onRemove={() => {}}
      data={appData}
    />
  ),
};
