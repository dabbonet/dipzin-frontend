import { Logo } from '@/components/UI/logo';
import { Icon } from '@/components/UI/icon';
import '@/styles/global.css';
import { Button } from '@/components/Shared/button';
import Link from 'next/link';
import { Navigator } from '../_components/navigator';
import { auth, signOut } from '@/auth';
import { type Session } from 'next-auth';
import { getInitialQuery } from '../_utils/initialQuery';

const Nav = ({ session, initialQuery }: { session: Session | null, initialQuery:any }) => (
  <header className="w-full h-fit px-8 pt-7 flex items-start justify-between gap-8 z-10 fixed top-0">
    <Link href="/" passHref>
      <Logo.Dipzin className="text-white" />
    </Link>
    <Navigator initialQuery={initialQuery}/>
    {session ? (
      <>
        {/* <Button className="rounded-full" size="xl" href="/account">
          <Icon.Example className="size-5" />
          Account
        </Button> */}
        <form
          action={async () => {
            "use server"

            await signOut()
          }}
        >
          <Button type="submit">Sign Out</Button>
        </form>
      </>
    ) : (
      <Button className="rounded-full" size="xl" href="/access">
        <Icon.Example className="size-5" />
        Login
      </Button>
    )}
  </header>
)

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { [key: string]: string };
}) {
  const session = await auth()
  const initialQuery = getInitialQuery(params.explorer)
  return (
    <div className="space-y-[52px]">
        <Nav session={session} initialQuery={initialQuery} />
        <main className="size-full px-4 md:px-6 lg:px-14 xl:px-20 2xl:px-[100px]">
          {children}
        </main>
    </div>
  );
}
