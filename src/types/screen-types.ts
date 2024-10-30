export interface ScreenData {
  id: number;
  is_published: boolean;
  is_showcase: boolean;
  screen: {
    id: string;
    hash: string;
    ext: string;
    width: number;
    height: number;
  };
  app: {
    id: string;
    platform: string;
    name: string;
    slug: string;
    tag_line: string;
    icon: {
      hash: string;
      ext: string;
    };
  };
  colors: string;
  tags: {
    id: string;
    name: string;
  }[];
  components: {
    id: string;
    name: string;
  }[]
}
