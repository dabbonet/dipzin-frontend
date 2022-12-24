import { ReactElement, useState } from "react";
import type { NextPageWithLayout } from "./_app";
import * as Yup from "yup";

import AuthLayout from "../components/auth/AuthLayout";
// import supabase from "../lib/supabase";

type Notification = {
    tag: string,
    color: string,
    message: string
}

import { Field, Form, Formik } from "formik";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

const emailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
});

const Page: NextPageWithLayout = () => {
    const [notification, setNotification] = useState<Notification>();

    const showNotificationMessage = (
        tag: string,
        color: string,
        message: string
    ) => {
        setNotification({ tag, color, message });
        setTimeout(() => {
            setNotification({ tag: "", color: "", message: "" });
        }, 3000);
    };

    const [supabase] = useState(() => createBrowserSupabaseClient());

    return (
        <div className="mx-auto w-full max-w-xl subpixel-antialiased">
            <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-200 to-orange-600 lg:text-5xl text-3xl">
                Your Go-To Source for Digital Inspiration
            </h1>
            <p className="text-white font-light mt-4 lg:text-base text-sm">
                Sign up to be notified when Dipzin launches and start discovering new
                ideas and staying up-to-date on the latest Product Design trends. We
                can't wait to see what you create with Dipzin!
            </p>

            <div className="relative w-full mt-6">
                <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                </div>

                <Formik
                    initialValues={{ email: "" }}
                    validationSchema={emailSchema}
                    onSubmit={async (values, actions) => {
                        const { error } = await supabase
                            .from("email_list")
                            .insert({ email: values.email });
                        if (error) {
                            if (error.code === "23505") {
                                showNotificationMessage(
                                    "error",
                                    "red",
                                    "This email is already in our database."
                                );
                            } else {
                                showNotificationMessage(
                                    "error",
                                    "red",
                                    "Error submitting email address: " + error.message
                                );
                            }
                            actions.setSubmitting(false);
                        } else {
                            showNotificationMessage(
                                "success",
                                "green",
                                "Email address successfully submitted!"
                            );
                            actions.setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <Field
                                require="require"
                                type="email"
                                name="email"
                                className="h-14 text-gray-900 text-sm rounded-lg border-transparent focus:ring-orange-500 focus:border-orange-500 block w-full pl-12 pr-32 p-2.5 bg-slate-900 dark:placeholder-slate-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                                placeholder="Your email address..."
                            />
                            {errors.email && touched.email ? (
                                <span className="text-sm mt-2 absolute top-2.5 right-36 text-red-500">
                                    {errors.email}
                                </span>
                            ) : null}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="absolute insety-y-0 top-2.5 right-2.5 py-2 px-3 rounded-md font-medium text-white bg-gradient-to-r from-orange-400 to-orange-600 text-sm"
                            >
                                Get Notified!
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            {/* <div className={`bg-${notification.type}-500 text-white p-4 rounded-md`}>
        {notification.message}
      </div> */}
            {notification && (
                <div
                    className={`bg-${notification.color}-500/30 text-white rounded-full mt-4`}
                >
                    <div
                        className={`p-2 bg-${notification.color}-800 items-center text-${notification.color}-100 leading-none flex lg:inline-flex`}
                        role="alert"
                    >
                        <span
                            className={`flex rounded-full bg-${notification.color}-500 uppercase px-2 py-1 text-xs mr-3`}
                        >
                            {notification.tag}
                        </span>
                        <span
                            className={`font-normal mr-2 text-left flex-auto text-sm text-${notification.color}-100`}
                        >
                            {notification.message}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};

export default Page;
