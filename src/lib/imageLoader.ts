const PREFIXES = ['', 'thumbnail_', 'small_', 'medium_', 'large_'];

export default function imageLoader({ src, quality }) {
    const prefixIndex = Math.floor((quality || 0) / 10);
    const prefix = PREFIXES[prefixIndex] || '';
    return `https://dipzin.s3.us-east-1.amazonaws.com/${prefix}${src}`
}