// Helper function to allow us to combine a list of class names
export default function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}