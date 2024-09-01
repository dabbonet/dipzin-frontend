export type ScreenType = {
  screen: {
    id: string;
    imgSrc: string;
    width: number;
    height: number;
    alt?: string;
    app: {
      id: string;
      avatar: {
        imgSrc: string;
      }
      name: string;
      tagLine: string;
    }
  },
  view?: 'default' | 'global' | 'in-app'
}
