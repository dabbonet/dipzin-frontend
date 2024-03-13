import React from "react";

const cardData = [
  {
    title: "Boost Your Design Workflow",
    subtitle: "Unlimited Screens",
    description:
      "Dipzin stands out with its extensive collection of tagged screenshots, curated from renowned designers across industries. Explore our vast database for new design trends, innovative interfaces, and creative solutions. Dive into beautifully crafted apps, learn from industry leaders, and infuse fresh ideas into your projects.",
  },
  {
    title: "Collaborative Sharing",
    subtitle: "Customizable Collections",
    description:
      "Coming soon, easily categorize, sort, and access your favorite screenshots in Dipzin's unlimited collection feature for an efficient workflow.",
  },
  {
    title: "Find with Precision",
    subtitle: "Advanced Search",
    description:
      "Discover designs that resonate with your project, save time, and focus on creating amazing designs with Dipzin's precise search capabilities.",
  },
  {
    title: "Simplified Inspiration Discovery",
    subtitle: "Comprehensive Tagging",
    description:
      "Navigate tagged designs by Category, Pattern, Components, and more for efficient organization and seamless inspiration discovery.",
  },
  {
    title: "Effortless Integration",
    subtitle: "Image Copy & Download",
    description:
      "Copy screenshots to your design tools, with a focus on providing a convenient experience, while we work on our Figma plugin and mobile app for better accessibility.",
  },
];

const FooterCards = () => {
  return (
    <div className="my-20 container mx-auto w-[90%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`bg-slate-800 bg-opacity-50 rounded-[36px]  py-14 lg:px-14 md:px-10 sm:px-6 px-3 text-center flex justify-end flex-col gap-5 ${
              index === 0 ? "lg:col-span-2 h-[509px]" : "h-[509px]"
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-slate-400">{card.subtitle}</span>
              <h1 className="lg:text-3xl md:text-xl text-base">{card.title}</h1>
            </div>
            <p className="text-slate-400">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterCards;
