import { ReactElement, useState } from "react";
import type { NextPageWithLayout } from "../_app";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

import AuthLayout from "../../components/auth/AuthLayout";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import Join from "./join";
import Login from "./login";
import OTP from "./otp";

const Page: NextPageWithLayout = () => {
    const session = useSession();
    const supabase = useSupabaseClient();
    const [status, setStatus] = useState<Boolean>(false);

    const handeChange = () => {
        setStatus(!status)
    }
    if (session) {
        return <div>Already logged in</div>;
    }
    return (
        <div className="mx-auto w-full max-w-xl subpixel-antialiased">

            {status ?
                <>
                    <Join />
                    <span className="dark:text-white block mt-4">
                        Already have an account?
                        <a className="ml-1 text-orange-500 font-semibold cursor-pointer" onClick={handeChange}>Sign in</a>
                    </span>

                </>
                :
                <>
                    <Login />
                    <span className="dark:text-white block mt-4">
                        Don’t have an account?
                        <a className="ml-1 text-orange-500 font-semibold cursor-pointer" onClick={handeChange}>Register</a>
                    </span>
                </>
            }


        </div>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};

export default Page;