export type IconType = {
  imgSrc: string;
  width: number;
  height: number;
};

export type Category = {
  name: string;
  icon: IconType;
  blockType: string;
};

export type AppDetails = {
  name?: string;
  imgSrc?: string;
  description?: string;
  platform?: string;
  rating?: number;
  category?: string;
  screenshots?: string[];
};

export type CategoryDetails = {
  title: string;
  items: { name: string; count: number }[];
};

export type SearchResult = {
  label: string;
  type: string;
  avatar?: string;
  description?: string;
  content: AppDetails | CategoryDetails;
};

export type FilterType = {
  id: string;
  name: string;
};
