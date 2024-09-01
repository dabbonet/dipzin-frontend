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

const userDetails = {
  name: "John Doe",
  username: "johndoe",
  bio: "This is a bio",
  email: "a.mahmoud@dabbo.net",
  title: "The great title",
  country: "United States",
  image: "https://via.placeholder.com/150",
}

export const Default: StoryObj<typeof SettingsModal> = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="md" variant="strocked">
          Open modal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <SettingsModal userDetails={userDetails} />
      </DialogContent>
    </Dialog>
  )
};
