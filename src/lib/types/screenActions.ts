export interface navigatorProps {
    appName?: string;
    screen?: {
      id: number;
      attributes: {
        screen: {
          data: {
            attributes: {
              hash: string,
              ext: string,
            }
          }
        }
        order: string,
      }
    };
  }