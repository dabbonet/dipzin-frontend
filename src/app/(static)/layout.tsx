import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer';
import { Background2 } from '@/ui/Backgrounds'
import '../globals.css'
import { Outfit } from 'next/font/google'
import { cn } from '@/lib/utils';
import Providers from '@/components/Providers';
import { AccessOrUpgradeCard } from '@/components/accessAndUbgrade';
import { Toaster } from 'react-hot-toast';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })


export const metadata = {
  title: 'Dipzin',
  description: 'Your Go-To Source for digital inspiration.',
  twitter: {
    card: 'summary_large_image',
    images: ['https://dipzin.s3.us-east-1.amazonaws.com/opengraph_image_c497db254d.jpg'],
  },
  openGraph: {
    url: 'https://dipzin.com',
    siteName: 'Dipzin',
    images: [
      {
        url: 'https://dipzin.s3.us-east-1.amazonaws.com/opengraph_image_c497db254d.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn('subpixel-antialiased font-sans', outfit.variable)}>
      <body className={cn('bg-fixed bg-gradient-to-tr from-slate-200 to-slate-300 dark:from-slate-950 dark:to-slate-950 min-h-screen w-full h-screen overflow-x-clip')}>
        <Providers>
          <Navbar />
          <AccessOrUpgradeCard />
          <Toaster position='bottom-right'/>
          <main className='pt-24 max-w-full mx-10'>
            {children}
          </main>
          {/* <Footer /> */}
          <Background2 />
        </Providers>
      </body>
    </html>
  )
}
