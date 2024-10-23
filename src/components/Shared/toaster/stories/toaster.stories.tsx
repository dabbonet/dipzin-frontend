import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/Shared/button';
import {
  Toaster, ToastAction
} from '..';
import {
  Avatar, AvatarFallback, AvatarImage
} from '@/components/Shared/avatar';
import { useToast } from '@/hooks/use-toast';

const meta: Meta<typeof Button> = {
  title: 'Shared/Toaster',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const SuccessToast: Story = {
  args: {
    children: 'Show Success Toast',
  },
  render: () => {
    const { toast } = useToast();

    return (
      <>
        <Button
          onClick={() => {
            toast({
              variant: 'success',
              title: 'Successfully toasted!',
              action: <ToastAction altText="Dismiss" variant="darkGrey">Dismiss</ToastAction>,
            });
          }}
        >
          Show Success Toast
        </Button>
        <Toaster />
      </>
    );
  },
};

export const WideToast: Story = {
  args: {
    children: 'Show Wide Toast',
  },
  render: () => {
    const { toast } = useToast();

    return (
      <>
        <Button
          onClick={() => {
            toast({
              title: 'This toast is super big. I don’t think anyone could eat it in one bite. It’s larger than you expected.',
              size: 'wide',
            });
          }}
        >
          Show Wide Toast
        </Button>
        <Toaster />
      </>
    );
  },
};

export const CustomToast: Story = {
  args: {
    children: 'Show Custom Toast',
  },
  render: () => {
    const { toast } = useToast();

    return (
      <>
        <Button
          onClick={() => {
            toast({
              startContent:
  <Avatar size="large" radius="square">
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>Shadcn</AvatarFallback>
  </Avatar>, // Replace with your actual icon or image
              title: 'Abdelrahman Nasser',
              description: 'Sure! 8:30pm works great!',
              size: 'wider',
              action: (
                <ToastAction altText="close" variant="link">
                  Close
                </ToastAction>
              ),
            });
          }}
        >
          Show Custom Toast
        </Button>
        <Toaster />
      </>
    );
  },
};
