interface PaginationDotsProps {
  totalSlides: number;
  currentIndex: number;
  maxDots?: number;
}

export const PaginationDots = ({
  totalSlides,
  currentIndex,
  maxDots = 5
}: PaginationDotsProps) => {
  const displayedDots = Math.min(totalSlides, maxDots);
  const startIndex = Math.max(0, currentIndex - Math.floor(displayedDots / 2));
  const endIndex = Math.min(totalSlides, startIndex + displayedDots);

  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: endIndex - startIndex }).map((_, index) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={`size-2 rounded-full mx-1 transition-colors ${
            startIndex + index === currentIndex ? 'bg-aqua-400' : 'bg-slate-800'
          }`}
        />
      ))}
    </div>
  );
};
