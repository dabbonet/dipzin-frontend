export type IconType = {
  imgSrc: string;
  width: number;
  height: number;
};

export type KeywordResult = {
  name: string;
  _meilisearch_id: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  screens: Screen | null;
  type?: string;
  flow_category?: string | null;
  types?: string[];
  component_category?: string | null;
  blockType?: string;
}

export type Category = {
  id?: string;
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

export type Filter = {
  name: string;
  pattern: 'tags' | 'components' | 'flowActions' | 'marketing' | "categories";
}

export type App = {
  slug: string;
}

export type Query = {
  apps?: App[] | string[];
  pattern: string;
  platform: string;
  change?: string;
  tags: string[];
  components: string[];
  categories: string[];
  flows: string[];
  marketing: string[];
}

export type DataQuery = {
  query: {
    apps: { slug: string }[];
    pattern: string;
    platform: string;
    change: string;
    filters: {
      name: string;
      pattern: string;
      neglected?: boolean;
      reason?: string;
    }[];
    offset: number;
    limit: number;
  };
  data: any; // Placeholder for fetched data
}
