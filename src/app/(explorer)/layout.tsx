import { Logo } from '@/components/UI/logo';
import { Icon } from '@/components/UI/icon';
import '@/styles/global.css';
import { Button } from '@/components/Shared/button';
import { auth, signOut } from '@/auth';
import { type Session } from 'next-auth';
import { Navigator } from './_components/navigator';
import { getInitialQuery } from './_utils/initialQuery';

const Nav = ({ session, initialQuery }: { session: Session | null, initialQuery: any }) => (
  <header className="w-screen h-fit px-4 pt-5 md:px-8 md:pt-7 flex flex-col md:flex-row md:justify-between items-start gap-4 md:gap-8 z-10 fixed top-0">
    <div className="flex w-full md:w-auto justify-between items-center">
      <a href="/" aria-label="Home">
        <Logo.Dipzin className="text-white" />
      </a>
      <div className="flex md:hidden">
        {session ? (
          <form
            action={async () => {
              "use server"

              await signOut()
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        ) : (
          <Button className="rounded-full" size="xl" href="/access">
            <Icon.Example className="size-5" />
            Login
          </Button>
        )}
      </div>
    </div>
    <Navigator initialQuery={initialQuery} />
    <div className="hidden md:flex">
      {session ? (
        <form
          action={async () => {
            "use server"

            await signOut()
          }}
        >
          <Button type="submit">Sign Out</Button>
        </form>
      ) : (
        <Button className="rounded-full" size="xl" href="/access">
          <Icon.Example className="size-5" />
          Login
        </Button>
      )}
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
  const session = await auth()
  const initialQuery = getInitialQuery(params.explorer)
  return (
    <div className="space-y-[15vh] md:space-y-[8vh]">
      <Nav session={session} initialQuery={initialQuery} />
      <main className="size-full px-2 md:px-4 lg:px-10 xl:px-16 2xl:px-[100px]">
        {children}
        {modal}
      </main>
    </div>
  );
}
