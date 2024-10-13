import { Logo } from '@/components/UI/logo';
import '@/styles/global.css';
import { Navigator } from '../_components/navigator';
import { getInitialQuery } from '../_utils/initialQuery';
import UserMenu from '@/components/Account/user-menu/src/user-menu';

const Nav = ({ initialQuery }: { initialQuery: any }) => (
  <header className="w-full h-fit px-8 pt-7 flex flex-col md:flex-row md:justify-between items-start gap-8 z-10 fixed top-0">
    <div className="flex w-full md:w-auto justify-between items-center">
      <a href="/" aria-label="Home">
        <Logo.Dipzin className="text-white" />
      </a>
      <div className="flex md:hidden">
        <UserMenu />
      </div>
    </div>
    <Navigator initialQuery={initialQuery} />
    <div className="hidden md:flex">
      <UserMenu />
    </div>
  </header>
)

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: any;
}) {
  const initialQuery = getInitialQuery(params.explorer)
  return (
    <div className="space-y-[52px]">
      <Nav initialQuery={initialQuery} />
      <main className="size-full px-4 md:px-6 lg:px-14 xl:px-20 2xl:px-[100px]">
        {children}
      </main>
    </div>
  );
}
