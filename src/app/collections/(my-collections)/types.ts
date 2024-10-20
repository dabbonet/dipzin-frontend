export interface Icon {
  id: number;
  imgSrc: string;
}

export interface App {
  id: number;
  name: string;
  icon: Icon;
}

export interface Screen {
  id: number;
  name: string;
  imgSrc: string;
}

export interface ScreenItem {
  id: number;
  name: string;
  platform: string;
  is_showcase: boolean;
  screen: Screen;
  app: App;
}

export interface CollectionType {
  id: number;
  name: string;
  updatedAt: string;
  screens: ScreenItem[];
}
