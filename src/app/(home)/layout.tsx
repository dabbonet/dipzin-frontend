


import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer';
import { Background1 } from '@/ui/Backgrounds'
import '../globals.css'
import { Outfit } from 'next/font/google'
import { cn } from '@/lib/utils';
import Providers from '@/components/Providers';
import Banner from '@/components/Banner';
import HomeNavigator from '@/components/HomeNavigator';
import MainNavigator from '@/components/navigator/main/main';
import { AccessOrUpgradeCard } from '@/components/accessAndUbgrade';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata = {
  title: 'Dipzin',
  description: 'Your Go-To Source for digital inspiration.',
  twitter: {
    card: 'summary_large_image',
    images: ['https://dipzin.s3.us-east-1.amazonaws.com/opengraph_image_c497db254d.jpg'],
  },
  openGraph: {
    url: 'https://dev.dipzin.com',
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
      <body className={cn('bg-fixed bg-[#030304] min-h-screen w-full h-screen')}>
        <Providers>
          <Navbar />
          <AccessOrUpgradeCard />
          <main className='pt-24 max-w-[82%]  mx-auto'>
            <Banner />
            <HomeNavigator />
            {children}
            <MainNavigator />
          </main>
          {/* <Footer /> */}
          <Background1 />
        </Providers>
      </body>
    </html>
  )
}
