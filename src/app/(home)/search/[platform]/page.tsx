import { SearchResultsContainer } from '@/components/search/SearchResultsContainer';
import { ScreenOverview } from '@/components/ScreenOverview';

export default function SearchPage() {

  return (
    <main className="w-full flex flex-col items-center">
      <SearchResultsContainer />
      <ScreenOverview />
    </main>
  );
}