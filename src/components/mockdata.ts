import type { Filter } from "@/types/navigation-types";
import { faker } from "@faker-js/faker";

const appData = {
  imgSrc: 'https://github.com/shadcn.png',
  name: 'Uber',
  tagLine: 'Find no stress rides, anytime.',
  platform: 'iOS, Android',
  rating: 4.9,
  category: 'Travel & Transportation',
};

const patternSwitcherData = [
  { label: "Apps", value: "apps" },
  { label: "Screens", value: "screens" },
  { label: "Components", value: "components" },
  { label: "Marketing", value: "marketing" },
  { label: "Flows", value: "flows" },
];

const platformSwitcherData = [
  { label: "iOS", value: "ios" },
  { label: "Android", value: "android" },
  { label: "Web", value: "web" },
];

// Mock data for search
const mockData = [
  { label: "Uber", type: "application" },
  { label: "Uber Eats", type: "application" },
  { label: "Utilities", type: "tag" },
  // Add more mock data as needed
];

const suggestionsData: Filter[] = [
  { name: "Avatar", pattern: "components" },
  { name: "Card", pattern: "components" },
  { name: "Button", pattern: "components" },
  { name: "Business", pattern: "categories" },
  { name: "Education", pattern: "categories" },
  { name: "Login Page", pattern: "marketing" },
  { name: "Onboarding", pattern: "flowActions" },
];

const initialContentData = {
  mostViewedApps: [
    { name: "Spotify", imgSrc: faker.image.avatar() },
    { name: "Upwork", imgSrc: faker.image.avatar() },
    { name: "Uber", imgSrc: faker.image.avatar() },
    { name: "Youtube", imgSrc: faker.image.avatar() },
    { name: "Unsplash", imgSrc: faker.image.avatar() },
    { name: "Uber Eats", imgSrc: faker.image.avatar() },
    { name: "Waze", imgSrc: faker.image.avatar() }
  ],
  suggestedFlows: [
    { name: "Onboarding", imgSrc: faker.image.avatar() },
    { name: "Upgrade", imgSrc: faker.image.avatar() },
    { name: "Shopping", imgSrc: faker.image.avatar() },
    { name: "Settings", imgSrc: faker.image.avatar() },
    { name: "Login", imgSrc: faker.image.avatar() },
    { name: "Profile", imgSrc: faker.image.avatar() },
    { name: "Onboarding", imgSrc: faker.image.avatar() },
    { name: "Shopping", imgSrc: faker.image.avatar() }
  ],
  screens: [
    "Login",
    "Splash",
    "Onboarding",
    "Complete Profile",
    "Check Out",
    "Dashboard",
    "Complete Profile",
    "Check Out",
    "Dashboard",
    "Complete Profile"
  ],
  elements: [
    "Card",
    "List",
    "Banner & Alert",
    "Tab Bar",
    "Splash",
    "Check Out",
    "Dashboard",
    "Complete Profile",
    "Dashboard",
    "Complete Profile"
  ]
}

const screenData = {
  screen: {
    id: `${Math.random()}`,
    imgSrc: `https://placehold.co/300x650`,
    width: 300,
    height: 650,
    app: {
      id: '1',
      avatar: {
        imgSrc: 'https://github.com/shadcn.png',
      },
      name: 'App Name',
      tagLine: 'App Tag Line',
    }
  },
  view: 'default'
};

const categoriesData = [
  {
    title: "First Category",
    items: [
      { name: "Business", count: 20 },
      { name: "Collaboration", count: 4 },
      { name: "Communication", count: 12 },
      { name: "CRM", count: 15 },
      { name: "Education", count: 22 },
      { name: "Finance", count: 21 },
      { name: "Food & Drink", count: 26 },
    ],
  },
  {
    title: "Second Category",
    items: [
      { name: "Travel", count: 16 },
      { name: "Business", count: 20 },
      { name: "Collaboration", count: 4 },
      { name: "Communication", count: 12 },
      { name: "CRM", count: 15 },
      { name: "Education", count: 22 },
      { name: "Finance", count: 21 },
      { name: "Food & Drink", count: 26 },
    ],
  },
];

const searchResults = [
  {
    label: "Uber",
    type: "app",
    avatar: "https://github.com/shadcn.png",
    description: "Ride-hailing app",
    content: {
      name: "Uber",
      description: "Ride-hailing app",
      platform: "iOS, Android",
      rating: 4.5,
      category: "Transportation",
      screenshots: Array(5).fill("https://placehold.co/300x650"),
    },
  },
  {
    label: "Uber Eats",
    type: "app",
    avatar: "https://github.com/shadcn.png",
    description: "Food delivery app",
    content: {
      name: "Uber Eats",
      description: "Food delivery app",
      platform: "iOS, Android",
      rating: 4.7,
      category: "Food & Drink",
      screenshots: Array(5).fill("https://placehold.co/300x650"),
    },
  },
  {
    label: "Utilities",
    type: "app-category",
    avatar: "https://github.com/shadcn.png",
    description: "Utility apps category",
    content: {
      title: "Utilities",
      items: [
        { name: "Calculators", count: 15 },
        { name: "Unit Converters", count: 10 },
        { name: "File Managers", count: 8 },
        { name: "Battery Savers", count: 5 },
      ],
    },
  },
];

export {
  appData, patternSwitcherData, platformSwitcherData, mockData, suggestionsData, initialContentData, screenData, categoriesData, searchResults
};
