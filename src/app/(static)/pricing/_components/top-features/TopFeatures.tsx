import React from 'react';
import FeatureCard from './FeatureCard';

interface Feature {
  img: {
    src: string;
    width: number;
    height: number;
  };
  label: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    img: {
      src: "/assets/features/unlimited-screens.svg",
      width: 850,
      height: 330
    },
    label: "Unlimited Screens",
    title: "Boost Your Design Workflow",
    description: "Dipzin stands out with its extensive collection of tagged screenshots, curated from renowned designers across industries. Explore our vast database for new design trends, innovative interfaces, and creative solutions. Dive into beautifully crafted apps, learn from industry leaders, and infuse fresh ideas into your projects."
  },
  {
    img: {
      src: "/assets/features/customizable-collections.svg",
      width: 669, // nice
      height: 300
    },
    label: "Customizable Collections",
    title: "Collaborative Sharing",
    description: "Effortlessly categorize, organize, and share your favorite apps, screens, and flows in Dipzin's dynamic collection feature. Whether collaborating with your team or refining your own creative process, collections give you seamless control over your visual assets, boosting efficiency and inspiring innovation."
  },
  {
    img: {
      src: "/assets/features/comprehensive-tagging.svg",
      width: 500,
      height: 350
    },
    label: "Comprehensive Tagging",
    title: "Simplified Inspiration",
    description: "Navigate tagged designs by Category, Pattern, Components, and more for efficient organization and seamless inspiration discovery."
  },
  {
    img: {
      src: "/assets/features/image-copy-&-download.svg",
      width: 500,
      height: 350
    },
    label: "Image Copy & Download",
    title: "Effortless Integration",
    description: "Copy screenshots to your design tools, with a focus on providing a convenient experience, while we work on our Figma plugin for better accessibility."
  },
  {
    img: {
      src: "/assets/features/advanced-search.svg",
      width: 500,
      height: 350
    },
    label: "Advanced Search",
    title: "Find with Precision",
    description: "Search by tags, apps, components, and flows. Combine multiple tags for precise results, making it easier to discover exactly what you're looking for."
  },
  {
    img: {
      src: "/assets/features/easy-switching.svg",
      width: 669, // nice again
      height: 300
    },
    label: "Easy Switching",
    title: "Platform & Pattern Switcher",
    description: "Easily switch between platforms (Ios, Android, Web) and patterns (Apps, Screens, Flows, Elements, Marketing Pages) to find the perfect design inspiration. Streamline your creative process and enhance project efficiency."
  },
  {
    img: {
      src: "/assets/features/multi-app-compare.svg",
      width: 850,
      height: 300
    },
    label: "Multi-App Compare",
    title: "Multi-App Comparison Made Easy",
    description: "Easily compare multiple apps side by side with our multi-app comparison feature. Navigate between two or more apps seamlessly using tab-like functionality. Streamline your decision-making process by viewing key elements at once. Perfect for evaluating design, features, and performance across apps."
  }
]

const TopFeatures: React.FC = () => (
  <section className="py-8 mx-auto max-w-screen-xl lg:py-16 gap-4 lg:gap-8 grid grid-cols-1 sm:grid-cols-7">
    <div className="col-span-7 sm:col-span-4">
      <FeatureCard {...(features[0] as Feature)} />
    </div>
    <div className="col-span-7 sm:col-span-3">
      <FeatureCard {...(features[1] as Feature)} />
    </div>

    <div className="col-span-7 flex flex-col lg:flex-row gap-4 lg:gap-8">
      <FeatureCard {...(features[2] as Feature)} />
      <FeatureCard {...(features[3] as Feature)} />
      <FeatureCard {...(features[4] as Feature)} />
    </div>

    <div className="col-span-7 sm:col-span-3">
      <FeatureCard {...(features[5] as Feature)} />
    </div>
    <div className="col-span-7 sm:col-span-4">
      <FeatureCard {...(features[6] as Feature)} />
    </div>
  </section>
);

export default TopFeatures;
