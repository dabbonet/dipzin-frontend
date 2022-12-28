import type { ReactElement } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";

const OTP = () => {
    return (
        <div className="mx-auto w-full max-w-xl subpixel-antialiased">
            <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-200 to-orange-600 lg:text-5xl text-3xl">
                Account Verification
            </h1>
            <p className="text-white font-light mt-4 lg:text-base text-sm">
                Please enter the otp number sent to your email.
            </p>
            <Formik
                onSubmit={async (values, actions) => {
                    const { error } = await supabase
                        .from("email_list")
                        .insert({ email: values.email });
                }}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="space-y-4">
                        <Field
                            require="require"
                            type="text"
                            name="username"
                            className="h-14 text-gray-900 text-sm rounded-lg border-slate-800 focus:ring-orange-500 focus:border-orange-500 block w-full pl-6 pr-32 p-2.5 bg-slate-900 dark:placeholder-slate-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                            placeholder="Username"
                        />
                        <Field
                            require="require"
                            type="email"
                            name="email"
                            className="h-14 text-gray-900 text-sm rounded-lg border-slate-800 focus:ring-orange-500 focus:border-orange-500 block w-full pl-6 pr-32 p-2.5 bg-slate-900 dark:placeholder-slate-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                            placeholder="Email Address"
                        />
                        {errors.email && touched.email ? (
                            <span className="text-sm mt-2 absolute top-2.5 right-36 text-red-500">
                                {errors.email}
                            </span>
                        ) : null}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-5 px-3 rounded-xl mt-6 font-semibold text-lg text-white bg-gradient-to-br from-orange-600 to-amber-600 hover:to-amber-500"
                        >
                            Send code
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default OTP;