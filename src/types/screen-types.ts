export interface ScreenData {
  id: number;
  platform: string;
  is_published: boolean;
  is_showcase: boolean;
  colors: string;
  screen: {
    id: number;
    url: string;
  };
  app: {
    id: number;
    name: string;
    slug: string;
    tag_line: string;
    icon: {
      url: string;
    }
  }
  tags: {
    id: number;
    name: string;
  }[];
  components: {
    id: number;
    name: string;
  }[];
}
