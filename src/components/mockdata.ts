import type { ScreenType } from "@/types/screen-types";
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
  { label: "Apps", value: "Apps" },
  { label: "Screens", value: "Screens" },
  { label: "Elements", value: "Elements" },
  { label: "Marketing", value: "Marketing" },
  { label: "Flows", value: "Flows" },
];

const platformSwitcherData = [
  { label: "iOS", value: "iOS" },
  { label: "Android", value: "Android" },
  { label: "Web", value: "Web" },
];

// Mock data for search
const mockData = [
  { label: "Uber", type: "application" },
  { label: "Uber Eats", type: "application" },
  { label: "Utilities", type: "tag" },
  // Add more mock data as needed
];

const suggestionsData = [
  { name: "Avatar", id: "avatar" },
  { name: "Card", id: "card" },
  { name: "Button", id: "button" },
  { name: "Business", id: "business" },
  { name: "Education", id: "education" },
  { name: "Login Page", id: "login-page" },
  { name: "Onboarding", id: "onboarding" },
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

const screenData: ScreenType = {
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

export {
  appData, patternSwitcherData, platformSwitcherData, mockData, suggestionsData, initialContentData, screenData
};
