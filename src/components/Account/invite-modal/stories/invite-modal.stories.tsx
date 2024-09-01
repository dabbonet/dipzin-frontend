import type { Meta, StoryObj } from '@storybook/react';
import { InviteModal } from '@/components/Account/invite-modal';
import {
  Dialog, DialogContent, DialogTrigger
} from '@/components/UI/dialog';
import { Button } from '@/components/Shared/button';

export default {
  title: 'Access/InviteModal',
  component: InviteModal,
  tags: ['autodocs'],
} as Meta;

export const Default: StoryObj<typeof InviteModal> = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="md" variant="strocked">
          Open modal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <InviteModal />
      </DialogContent>
    </Dialog>
  )
};
