const PREFIXES = ['', 'thumbnail_', 'small_', 'medium_', 'large_'];

export default function myImageLoader({ src, width, quality }: any) {
    const prefixIndex = Math.floor((quality || 0) / 10);
    const prefix = PREFIXES[prefixIndex] || '';
    return `https://dipzinapplications.s3.us-west-1.amazonaws.com/${prefix}${src}`
}