import type { Meta, StoryObj } from '@storybook/react';
import { ScreenDetails } from '@/components/Explorer/screen-details';
import { Tabs } from '@/components/UI/tabs';

const mockData = {
  app: {
    slug: 'uber',
    icon: 'https://via.placeholder.com/56',
    name: 'Uber',
    tag_line: 'Find no stress rides, anytime.',
  },
  tags: [
    { id: 1, attributes: { name: 'UI' } },
    { id: 2, attributes: { name: 'Design' } },
    { id: 3, attributes: { name: 'Mobile' } },
    { id: 4, attributes: { name: 'Web' } },
  ],
  components: [
    { id: 1, attributes: { name: 'Button' } },
    { id: 2, attributes: { name: 'Card' } },
    { id: 3, attributes: { name: 'Dialog' } },
    { id: 4, attributes: { name: 'Tabs' } },
  ],
  colors: '#FF0000,#00FF00,#0000FF,#FFFF00,#00FFFF',
};

const meta: Meta<typeof ScreenDetails> = {
  title: 'Explorer/ScreenDetails',
  component: ScreenDetails,
  tags: ['autodocs'],
  args: {
    data: mockData
  },
};

export default meta;

export const DefaultView: StoryObj<typeof ScreenDetails> = {
  render(args) {
    return (
      <Tabs defaultValue="section">
        <ScreenDetails {...args} />
      </Tabs>
    );
  }
};

export const WideView: StoryObj<typeof ScreenDetails> = {
  render(args) {
    return (
      <Tabs defaultValue="section">
        <ScreenDetails {...args} type="wide" />
      </Tabs>
    );
  }
};
