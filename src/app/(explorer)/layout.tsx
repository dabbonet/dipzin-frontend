import { Logo } from '@/components/UI/logo';
import UserMenu from '@/components/Account/user-menu/src/user-menu';
import OnboardingModal from '@/components/Account/onboarding-modal/onboarding-modal';
import { Navigator } from './_components/navigator';
import { getInitialQuery } from './_utils/initialQuery';
import '@/styles/global.css';

const Nav = ({ initialQuery }: { initialQuery: any }) => (
  <header className="w-full h-fit px-4 pt-5 md:px-8 md:pt-7 flex flex-col md:flex-row md:justify-between items-start gap-4 md:gap-8 z-50 fixed top-0">
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
  modal,
  params
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: any;
}) {
  const initialQuery = getInitialQuery(params.explorer)
  return (
    <div className="space-y-[15vh] md:space-y-[8vh]">
      <Nav initialQuery={initialQuery} />
      <main className="size-full px-2 md:px-4 lg:px-10 xl:px-16 2xl:px-[100px]">
        {children}
        {modal}
      </main>
      <OnboardingModal />
    </div>
  );
}
