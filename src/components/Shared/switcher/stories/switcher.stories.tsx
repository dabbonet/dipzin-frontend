import React, { useState } from "react";
import { Switcher } from "@/components/Shared/switcher";
import type { Meta } from "@storybook/react";

export default {
  title: "Shared/Switcher",
  component: Switcher,
  argTypes: {
    data: {
      control: {
        type: "object",
      },
    },
    value: {
      control: {
        type: "object", // Changed from "array" to "object"
      },
    },
  },
} as Meta;

const Template: React.FC<any> & { args?: any } = (args: any) => {
  const [selected, setSelected] = useState<string[]>(args.value || []);

  return (
    <div>
      <Switcher {...args} value={selected} onChange={setSelected} />
      <div className="mt-4">
        <strong>Selected Values:</strong>
        {' '}
        {selected.join(", ")}
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  data: [
    { label: "Apps", value: "Apps" },
    { label: "Screens", value: "Screens" },
    { label: "Elements", value: "Elements" },
    { label: "Marketing", value: "Marketing" },
    { label: "Flows", value: "Flows" },
  ],
  value: ["Apps"], // Must be an array since we're using multiple selection
};

export const Open = Template.bind({});
Open.args = {
  ...Default.args,
  state: "open",
};
