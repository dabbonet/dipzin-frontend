import React from 'react';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    user: {
      name: 'Ahmed Mahmoud',
      position: 'Product Manager',
      imgSrc: 'https://randomuser.me/api/portraits/men/51.jpg'
    },
    testimonial: 'Dipzin makes it so easy to browse through a variety of marketing pages from top apps. The platform has helped us find new ideas without the hassle. It\'s like having a creative library that we can explore anytime.'
  },
  {
    user: {
      name: 'Waleed Ali',
      position: 'Senior UI/UX Designer',
      imgSrc: 'https://randomuser.me/api/portraits/men/51.jpg'
    },
    testimonial: 'We’ve been using Dipzin to gather inspiration for our projects, and it’s been a game-changer. The ability to preview and save our favorite designs has streamlined our process, making our work more efficient and creative.'
  },
  {
    user: {
      name: 'Abdelrahman Nasser',
      position: 'UI/UX Designer',
      imgSrc: 'https://randomuser.me/api/portraits/men/51.jpg'
    },
    testimonial: 'Dipzin has become our favorite tool for exploring how successful apps showcase their marketing pages. The ease of navigating and filtering through different designs has given us fresh ideas and inspiration for our own campaigns. We love having such a rich resource at our fingertips.'
  },
  {
    user: {
      name: 'Noelle Carroll ',
      position: 'UI/UX Designer',
      imgSrc: 'https://randomuser.me/api/portraits/men/51.jpg'
    },
    testimonial: 'Dipzin has simplified how we study and compare marketing strategies across different apps. The filtering options are super handy, letting us zero in on what’s relevant to us. It’s now an essential part of our marketing toolkit.'
  },
]

const CustomerLoveCorner: React.FC = () => (
  <section className="py-8 mx-auto max-w-screen-xl lg:py-16 container">
    <div className="md:columns-2 gap-6 p-4 sm:p-1 mt-2">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.user.name} testimonial={testimonial} />
      ))}
    </div>
  </section>
);

export default CustomerLoveCorner;
