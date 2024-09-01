import type { Meta, StoryObj } from '@storybook/react';
import { AccessModal } from '@/components/Account/access-modal';
import {
  Dialog, DialogContent, DialogTrigger
} from '@/components/UI/dialog';
import { Button } from '@/components/Shared/button';

export default {
  title: 'Access/AccessModal',
  component: AccessModal,
  tags: ['autodocs'],
} as Meta;

export const Default: StoryObj<typeof AccessModal> = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="md" variant="strocked">
          Open modal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AccessModal />
      </DialogContent>
    </Dialog>
  )
};
