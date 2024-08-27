import { faker } from "@faker-js/faker";

const appData = {
  imgSrc: 'https://github.com/shadcn.png',
  fallback: 'ub',
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
  { label: "Avatar", id: "avatar" },
  { label: "Card", id: "card" },
  { label: "Button", id: "button" },
  { label: "Business", id: "business" },
  { label: "Education", id: "education" },
  { label: "Login Page", id: "login-page" },
  { label: "Onboarding", id: "onboarding" },
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

export {
  appData, patternSwitcherData, platformSwitcherData, mockData, suggestionsData, initialContentData
};
