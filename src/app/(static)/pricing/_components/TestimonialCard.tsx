import { Card, CardContent, CardHeader } from '@/components/UI/card'
import { extractInitials } from '@/utils/StringUtils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Shared/avatar'
import React from 'react'
import { Logo } from '@/components/UI/logo'
import ReactMarkdown from 'react-markdown'

interface TestimonialCardType {
  user: {
    name: string
    position: string
    imgSrc:string
  }
  testimonial: string
}

interface TestimonialCardProps {
  testimonial: TestimonialCardType
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <Card className="max-w-full md:max-w-[50vw] bg-slate-800 border-0 p-4 md:p-8 mb-6 rounded-3xl font-outfit break-inside-avoid">
    <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4 md:gap-6">
        <Avatar size="large" className="size-12 md:size-20">
          <AvatarImage src={testimonial.user.imgSrc} alt={testimonial.user.name} />
          <AvatarFallback>{extractInitials(testimonial.user.name)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 md:space-y-2">
          <h4 className="text-lg sm:text-xl md:text-[32px] font-medium leading-6 md:leading-[40px] text-white">{testimonial.user.name}</h4>
          <p className="text-base sm:text-lg md:text-2xl leading-normal text-white/60">{testimonial.user.position}</p>
        </div>
      </div>
      <Logo.X className="size-6 sm:size-8 md:size-[40px]" />
    </CardHeader>
    <CardContent>
      <ReactMarkdown className="text-base sm:text-lg md:text-[32px] text-white/60">
        {testimonial.testimonial}
      </ReactMarkdown>
    </CardContent>
  </Card>
)

export default TestimonialCard
