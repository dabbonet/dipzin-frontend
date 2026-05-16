import { Logo } from "@/components/UI/logo";
import UserMenu from "@/components/Account/user-menu/src/user-menu";
import OnboardingModal from "@/components/Account/onboarding-modal/onboarding-modal";
import { Navigator } from "../_components/navigator";
import { getInitialQuery } from "../_utils/initialQuery";
import "@/styles/global.css";
import BulkActions from "@/components/Explorer/bulk-actions";

const Nav = ({ initialQuery }: { initialQuery: any }) => (
  <nav className="bg-gradient-to-b from-slate-950 to-slate-950 sm:to-transparent pb-3 sm:pb-0 w-screen px-4 pt-5 md:px-8 md:pt-7 flex flex-col md:flex-row md:justify-between items-start gap-4 md:gap-8 z-50 fixed top-0" style={{ height: '92px' }}>
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
  </nav>
);

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const initialQuery = getInitialQuery(params.explorer);
  return (
    <div className="min-h-screen flex flex-col">
      <Nav initialQuery={initialQuery} />
      <main className="flex-1 px-4 md:px-8 lg:px-10 xl:px-16 2xl:px-[100px] pt-[100px]">
        {/* <PanelHeader /> */}
        {children}
      </main>
      <OnboardingModal />
      <BulkActions />
    </div>
  );
}
