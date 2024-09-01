import { Card, CardContent, CardHeader } from '@/components/UI/card'
import { extractInitials } from '@/utils/StringUtils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Shared/avatar'
import React from 'react'
import { Logo } from '@/components/UI/logo'
import ReactMarkdown from 'react-markdown'

interface TestimonialType {
  user: {
    name: string
    tagName: string
    imgSrc:string
  }
  testimonial: string
}

interface TestimonialProps {
  testimonial: TestimonialType
}

const Testimonial = ({ testimonial }: TestimonialProps) => (
  <Card className="max-w-[50vw] bg-slate-800 border-0 p-8 rounded-3xl font-outfit">
    <CardHeader className="size-full flex flex-row items-center justify-between gap-4">
      <div className="size-full flex items-center gap-6">
        <Avatar size="large">
          <AvatarImage src={testimonial.user.imgSrc} alt={testimonial.user.name} />
          <AvatarFallback>{extractInitials(testimonial.user.name)}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h4 className="text-[32px] font-medium leading-[40px] text-white">{testimonial.user.name}</h4>
          <p className="text-2xl text-white/60">{testimonial.user.tagName}</p>
        </div>
      </div>
      <Logo.X className="size-[40px]" />
    </CardHeader>
    <CardContent>
      <ReactMarkdown className="text-[32px] text-white/60">
        {testimonial.testimonial}
      </ReactMarkdown>
    </CardContent>
  </Card>
)

export default Testimonial
