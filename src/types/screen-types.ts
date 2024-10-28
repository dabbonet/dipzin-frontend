export interface ScreenData {
  id: string;
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
  is_published: boolean;
  is_showcased: boolean;
  colors: string;
  screen: {
    id: string;
    hash: string;
    ext: string;
  };
  tags: {
    id: string;
    name: string;
  }[];
  components: {
    id: string;
    name: string;
  }[]
}
