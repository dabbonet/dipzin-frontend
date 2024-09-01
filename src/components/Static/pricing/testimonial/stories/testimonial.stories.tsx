import type { Meta, StoryObj } from '@storybook/react';
import { Testimonial } from '@/components/Static/pricing/testimonial';

export default {
  title: 'Static/Pricing/Testimonial',
  component: Testimonial,
} as Meta;

export const Default: StoryObj<typeof Testimonial> = {
  args: {
    testimonial: {
      user: {
        name: 'John Doe',
        tagName: '@ahmed',
        imgSrc: 'https://github.com/shadcn.png',
      },
      testimonial: 'The scroll variant in @framer hits differently. Never imaged that making some complex things would be easy that.',
    },
  },
};
