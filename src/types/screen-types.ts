export type ScreenType = {
  screen: {
    id: string;
    screen: {
      hash: string;
      ext: string;
      width: number;
      height: number;
      alternativeText?: string;
    }
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
