type screen = {
  id: number,
  attributes: {
    order: number,
    screen: {
      data: {
        id: number
        attributes: {
          hash: string,
          ext: string,
          url: string
        }
      }
    }
  }
}


export interface navigatorProps {
  isFromCollection?: boolean,
  app?: {
    categories: {},
    screens: {
      data: screen[]
    },
    platform: {
      data: {
        attributes: {
          name: string
        }
      }
    },
    store_link: string,
    name: string,
    slug: string,
    tag_line: string
  };
}