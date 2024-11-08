import type { Meta, StoryObj } from '@storybook/react';
import { SettingsModal } from '@/components/Account/settings-modal';
import {
  Dialog, DialogContent, DialogTrigger
} from '@/components/UI/dialog';
import { Button } from '@/components/Shared/button';

export default {
  title: 'Access/SettingsModal',
  component: SettingsModal,
  tags: ['autodocs'],
} as Meta;

export const Default: StoryObj<typeof SettingsModal> = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="md" variant="strocked">
          Open modal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <SettingsModal />
      </DialogContent>
    </Dialog>
  )
};
