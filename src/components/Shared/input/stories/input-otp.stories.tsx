import type { Meta, StoryObj } from '@storybook/react';
import { InputOTP, InputOTPSlot } from '@/components/Shared/input';

const meta: Meta<typeof InputOTP> = {
  title: 'Shared/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'error'],
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

const OTPTemplate: Story = {
  render: (args: any) => (
    <InputOTP {...args} maxLength={6}>
      {Array.from({ length: 6 }, (_, index) => (
        <InputOTPSlot key={index} index={index} variant={args.variant} />
      ))}
    </InputOTP>
  ),
};

export const DefaultOTP: Story = {
  ...OTPTemplate,
};

export const SuccessStateOTP: Story = {
  ...OTPTemplate,
  args: { variant: 'success' },
};

export const ErrorStateOTP: Story = {
  ...OTPTemplate,
  args: { variant: 'error' },
};

export const DisabledOTP: Story = {
  ...OTPTemplate,
  args: { disabled: true },
};
