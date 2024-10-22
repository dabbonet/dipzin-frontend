import type { Meta, StoryObj } from '@storybook/react';
import { ScreenDetails } from "..";
import { Tabs } from '@/components/UI/tabs';

const mockData = {
  id: "1",
  platform: "web",
  is_published: true,
  is_showcase: false,
  is_showcased: false,
  colors: "#FF0000,#00FF00,#0000FF,#FFFF00,#00FFFF",
  screen: {
    id: "1",
    hash: "example-hash",
    ext: ".png"
  },
  app: {
    id: "1",
    platform: "web",
    name: "Example App",
    slug: "example-app",
    tag_line: "This is an example app",
    icon: {
      hash: "example-hash",
      ext: ".png"
    }
  },
  tags: [
    { id: "1", name: "tag1" },
    { id: "2", name: "tag2" }
  ],
  components: [
    { id: "1", name: "component1" },
    { id: "2", name: "component2" }
  ],
};

const meta: Meta<typeof ScreenDetails> = {
  title: 'Shared/screen/ScreenDetails',
  component: ScreenDetails,
  tags: ['autodocs'],
};

export default meta;
export const DefaultView: StoryObj<typeof ScreenDetails> = {
  render() {
    return (
      <Tabs defaultValue="section">
        <ScreenDetails screen={mockData} />
      </Tabs>
    );
  }
};

export const WideView: StoryObj<typeof ScreenDetails> = {
  render() {
    return (
      <Tabs defaultValue="section">
        <ScreenDetails screen={mockData} type="wide" />
      </Tabs>
    );
  }
};
