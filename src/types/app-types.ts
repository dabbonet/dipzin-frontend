// AppType
export interface AppType {
  id: number
  name: string
  slug: string
  tag_line: string
  platform: string
  icon: Icon | string
  categories?: Category[]
  screens?: Screen[]
}

export interface Icon {
  hash: string
  ext: string
}

export interface Category {
  id: number
  name: string
}

export interface Screen {
  id: number
  screen: ScreenBlob,
  app?: {
    id: string;
    icon: { hash: string, ext: string };
    name: string;
    platform: string;
    tagLine: string;
  }
}

export interface ScreenBlob {
  id: number
  width: number
  height: number
  hash: string
  ext: string
  alternativeText?: string
}

// FlowType
export interface FlowType {
  id: number
  name: string
  app: AppType
  flow_actions: any[]
  flow_screens: FlowScreen[]
}

export interface FlowScreen {
  id: number
  screen: Screen
}
