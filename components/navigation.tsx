import { AppProps } from "next/app";
import Image from "next/image";
import { useState } from "react";

function Navigation() {
  return (
    <header className="flex justify-between items-center lg:px-6 pt-4">
      <nav className="px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <a href="https://dipzin.com" className="flex items-center">
            <Image
              className="mr-3 h-6 sm:h-9"
              src="/images/dipzin-dark.svg"
              alt="Dipzin Logo"
              width={110}
              height={39}
            />
          </a>
          <div className="flex items-center lg:order-2 lg:border-l lg:border-slate-200 lg:dark:border-slate-800 lg:ml-6 pl-6">
            <span className="text-slate-400 subpixel-antialiased ">
              hello@dipzin.com
            </span>
          </div>
        </div>
      </nav>

      <div className="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800 h-8 mr-4">
        <a
          href="https://twitter.com/dipzincom"
          target="_blank"
          className="block fill-slate-400 hover:fill-slate-500 dark:hover:fill-slate-300"
        >
          <span className="sr-only">Twitter</span>
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Twitter</title>
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </a>

        <a
          href="https://www.instagram.com/dipzincom/"
          target="_blank"
          className="block ml-6 fill-slate-400 hover:fill-slate-500 dark:hover:fill-slate-300"
        >
          <span className="sr-only">Instagram</span>
          <svg
            role="img"
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
          >
            <title>Instagram</title>
            <path d="m160 128a32 32 0 1 1 -32-32 32.03667 32.03667 0 0 1 32 32zm68-44v88a56.06353 56.06353 0 0 1 -56 56h-88a56.06353 56.06353 0 0 1 -56-56v-88a56.06353 56.06353 0 0 1 56-56h88a56.06353 56.06353 0 0 1 56 56zm-52 44a48 48 0 1 0 -48 48 48.05436 48.05436 0 0 0 48-48zm16-52a12 12 0 1 0 -12 12 12 12 0 0 0 12-12z" />
          </svg>
        </a>

        <a
          href="https://www.linkedin.com/company/dipzin/"
          target="_blank"
          className="block ml-6 fill-slate-400 hover:fill-slate-500 dark:hover:fill-slate-300"
        >
          <span className="sr-only">Linkedin</span>
          <svg
            role="img"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>LinkedIn</title>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </header>
  );
}

export default Navigation;
