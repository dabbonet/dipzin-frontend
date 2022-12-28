import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

import AuthLayout from "../../components/auth/AuthLayout";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";

const Login = () => {
  return (
    <div className="mx-auto w-full max-w-xl subpixel-antialiased">
      <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-200 to-orange-600 lg:text-5xl text-3xl">
        Log in to your account
      </h1>
      <p className="text-white font-light mt-4 lg:text-base text-sm">
        Welcome back! Please enter your details.
      </p>
      <div className="flex mt-4 space-x-3 mx-auto">
        <a href="#" className="px-8 py-4 rounded-2xl border border-amber-500 text-white">Continue with Google</a>
        <a href="#" className="px-8 py-4 rounded-2xl border border-amber-500 text-white">Continue with Facebook</a>
      </div>

      <div className="flex flex-row justify-center my-8 w-[75%] mx-auto">
        <span className="absolute bg-slate-900 px-4 text-gray-500">or</span>
        <div className="w-full bg-slate-700 mt-3 h-px"></div>
      </div>
      <Formik
        onSubmit={async (values, actions) => {
          const { error } = await supabase
            .from("email_list")
            .insert({ email: values.email });
          // if (error) {
          //     if (error.code === "23505") {
          //         showNotificationMessage(
          //             "error",
          //             "red",
          //             "This email is already in our database."
          //         );
          //     } else {
          //         showNotificationMessage(
          //             "error",
          //             "red",
          //             "Error submitting email address: " + error.message
          //         );
          //     }
          //     actions.setSubmitting(false);
          // } else {
          //     showNotificationMessage(
          //         "success",
          //         "green",
          //         "Email address successfully submitted!"
          //     );
          //     actions.setSubmitting(false);
          // }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Field
              require="require"
              type="email"
              name="email"
              className="h-14 text-gray-900 text-sm rounded-lg border-slate-700 focus:ring-orange-500 focus:border-orange-500 block w-full pl-6 pr-32 p-2.5 bg-slate-900 dark:placeholder-slate-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
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

export default Login;