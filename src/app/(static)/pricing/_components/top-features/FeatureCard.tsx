import {
  Card, CardContent, CardDescription, CardTitle
} from '@/components/UI/card';
import Image from 'next/image';
import React from 'react';

interface Feature {
  img:{
    src: string;
    width: number;
    height: number;
  }
  label: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<Feature> = ({
  img, label, title, description
}) => (
  <Card className="size-full bg-gray-900/90">
    <Image src={img.src} width={img.width} height={img.height} alt={title} />
    <CardContent className="text-center">
      <span className="text-slate-400 text-2xl mb-1 mt-2">{label}</span>
      <CardTitle className="text-slate-50 text-4xl font-bold mb-5">{title}</CardTitle>
      <CardDescription className="text-slate-400 text-lg">{description}</CardDescription>
    </CardContent>
  </Card>
);

export default FeatureCard;
