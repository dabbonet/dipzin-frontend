'use client'

import { useResponsive } from "@/context/useResponsive";

const PREFIXES = ['', 'thumbnail_', 'small_', 'medium_', 'large_'];

export default function imageLoader({ src, quality }) {
    const {isMobile} = useResponsive()
    const prefixIndex = Math.floor((quality || 0) / 10);
    const prefix = !isMobile ? PREFIXES[prefixIndex] || '' : PREFIXES[prefixIndex-1];
    return `https://dipzin.s3.us-east-1.amazonaws.com/${prefix}${src}`
}