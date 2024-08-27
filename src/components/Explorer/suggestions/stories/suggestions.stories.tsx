import type { Meta } from "@storybook/react";
import React, { useState } from "react";

import { Suggestions } from "@/components/Explorer/suggestions";

export default {
  title: "Explorer/Suggestions",
  component: Suggestions,
  argTypes: {
    suggestions: {
      control: {
        type: "object",
      },
    },
    selected: {
      control: {
        type: "text",
      },
    },
  },
} as Meta;

const Template: React.FC<any> & { args?: any } = (args: any) => {
  const [selected, setSelected] = useState(args.selected);

  return (
    <div>
      <Suggestions {...args} selected={selected} setSelected={setSelected} />
      <div className="mt-4">
        <strong>Selected IDs:</strong>
        {' '}
        {JSON.stringify(selected)}
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  suggestions: [
    { label: "Avatar", id: "avatar" },
    { label: "Card", id: "card" },
    { label: "Button", id: "button" },
    { label: "Business", id: "business" },
    { label: "Education", id: "education" },
    { label: "Login Page", id: "login-page" },
    { label: "Onboarding", id: "onboarding" },
  ],
  selected: [],
};
