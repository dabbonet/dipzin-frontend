import type { AppType } from "./app-types";

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
  app: AppType;
  colors: string;
  tags: {
    id: string;
    name: string;
  }[];
  components: {
    id: string;
    name: string;
  }[]
  full_page?: {
    id: string;
    hash: string;
    ext: string;
    width: number;
    height: number;
  }
}
