import type { Meta, StoryObj } from '@storybook/react';
import { ScreenDetails } from "..";
import { Tabs } from '@/components/UI/tabs';

const mockData = {
  id: 1,
  platform: "web",
  is_published: true,
  is_showcase: false,
  colors: "#FF0000,#00FF00,#0000FF,#FFFF00,#00FFFF",
  screen: {
    id: 1,
    url: "https://placehold.co/1000x600/black/white.png"
  },
  app: {
    id: 1,
    name: "Example App",
    slug: "example-app",
    tag_line: "This is an example app",
    icon: {
      url: "https://example.com/icon.png"
    }
  },
  tags: [
    { id: 1, name: "tag1" },
    { id: 2, name: "tag2" }
  ],
  components: [
    { id: 1, name: "component1" },
    { id: 2, name: "component2" }
  ],
};

const meta: Meta<typeof ScreenDetails> = {
  title: 'Shared/screen/ScreenDetails',
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
