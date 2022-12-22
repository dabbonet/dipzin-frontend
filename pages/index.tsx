import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

import AuthLayout from "../components/auth/AuthLayout";

const Page: NextPageWithLayout = () => {

    return (
        <div
            className="mx-auto w-full max-w-md text-2xl subpixel-antialiased"
            style={{ padding: "50px 0 100px 0" }}
        >
            <h1 className="font-bold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-lime-200 to-orange-600">Your Go-To Source for Digital Inspiration</h1>
            <p className="text-white text-sm font-light mt-4">Sign up to be notified when Dipzin launches and start discovering new ideas and staying up-to-date on the latest Product Design trends. We can't wait to see what you create with Dipzin!</p>

            <div className="relative w-full mt-6">
                <label htmlFor="member_email" className="hidden block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                </div>
                <input
                    className="h-14 text-gray-900 text-sm rounded-lg border-transparent focus:ring-orange-500 focus:border-orange-500 block w-full pl-12 pr-32 p-2.5 bg-slate-900 dark:placeholder-slate-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    placeholder="Your email address..."
                    type="email"
                    name="member[email]"
                    id="member_email"
                />
                <button className="absolute insety-y-0 top-2.5 right-2.5 py-2 px-3 rounded-md font-medium text-white bg-gradient-to-r from-orange-400 to-orange-600 text-sm">Get Notified!</button>
            </div>
        </div>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};

export default Page;
