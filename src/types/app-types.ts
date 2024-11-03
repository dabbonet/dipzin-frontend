import type { ScreenData } from "./screen-types"

// AppType
export interface AppType {
  id: number
  name: string
  slug: string
  tag_line: string
  platform: string
  icon: Icon;
  categories?: Category[]
  screens?: ScreenData[]
}

export interface Icon {
  hash: string
  ext: string
}

export interface Category {
  id: number
  name: string
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
  screen: ScreenData
}
