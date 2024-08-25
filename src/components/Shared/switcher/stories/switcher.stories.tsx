import type { Meta } from "@storybook/react";
import React, { useState } from "react";

import { Switcher } from "@/components/Shared/switcher";

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
        type: "text",
      },
    },
  },
} as Meta;

const Template: React.FC<any> & { args?: any } = (args: any) => {
  const [selected, setSelected] = useState(args.value);

  return (
    <div>
      <Switcher {...args} value={selected} onChange={setSelected} />
      <div className="mt-4">
        <strong>Selected Value:</strong>
        {' '}
        {selected}
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
  value: "Apps",
};
