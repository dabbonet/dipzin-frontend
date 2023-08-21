
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer';
import { Background } from '@/ui/Backgrounds'
import './globals.css'
import { Outfit } from 'next/font/google'
import { cn } from '@/lib/utils';
import Providers from '@/components/Providers';
import { Toaster } from 'react-hot-toast';
import { AccessOrUpgradeCard } from '@/components/accessAndUpgrade';
import GoogleOneTap from '@/components/GoogleOneTap';
import Analytics from '@/lib/Analytics';
import { Suspense } from 'react';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata = {
  metadataBase: new URL('https://dipzin.com'),
  title: 'Dipzin — A Curated Collection of Design Works Meant to Inspire.',
  description: 'Welcome to Dipzin: A curated hub where functionality meets aesthetics. We provide designers with a rich library of practical and visually stunning designs, making inspiration and application seamless.',
  keywords: ['Design', 'Inspiration', 'UI/UX'],
  publisher: "Dabbo",
  alternates: {
    canonical: '/'
  },
  colorScheme: 'dark',
  twitter: {
    card: 'summary_large_image',
    title: 'Dipzin — A Curated Collection of Design Works Meant to Inspire.',
    description: 'Welcome to Dipzin: A curated hub where functionality meets aesthetics. We provide designers with a rich library of practical and visually stunning designs, making inspiration and application seamless.',
    site: '@dipzincom',
    creator: '@dipzincom'
    // images: ['https://dipzin.s3.us-east-1.amazonaws.com/opengraph_image_c497db254d.jpg'],
  },
  openGraph: {
    url: 'https://dipzin.com',
    siteName: 'Dipzin',
    // images: [
    //   {
    //     url: 'https://dipzin.s3.us-east-1.amazonaws.com/opengraph_image_c497db254d.jpg',
    //     width: 800,
    //     height: 600,
    //   },
    // ],
    locale: 'en-US',
    type: 'website',
  },
}

export default function RootLayout({
  params,
  children,
}: {
  params: any,
  children: any
}) {
  // if route is in this array ['/ios','/android','/web'] return component <Banner>


  return (
    <html lang="en" className={cn('subpixel-antialiased font-sans', outfit.variable)}>
      <body className={cn('bg-fixed w-full h-full relative background')}>
        <Suspense>
          <Analytics />
          <Providers>
            <Navbar />
            <AccessOrUpgradeCard />
            <main className='pt-24 max-w-[90%]  mx-auto'>
              <GoogleOneTap />
              {children}
            </main>
            <Footer />
            <Background />
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
