import type { ReactElement } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import * as EmailValidator from "email-validator";
// import Cookies from "js-cookie";
import { supabase } from "../../client";
import { useCookies } from "react-cookie";

const Join = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['cokemail']);

  return (
    <div className="mx-auto w-full max-w-xl subpixel-antialiased">
      <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-200 to-orange-600 lg:text-5xl text-3xl">
        Create you account
      </h1>
      <p className="text-white font-light mt-4 lg:text-base text-sm mb-7">
        Welcome to dipzin! Please enter your details.
      </p>
      {/*      <div className="flex mt-4 space-x-3 mx-auto">
        <a
          href="#"
          className="px-8 py-4 rounded-2xl border border-amber-500 text-white"
        >
          Continue with Google
        </a>
        <a
          href="#"
          className="px-8 py-4 rounded-2xl border border-amber-500 text-white"
        >
          Continue with Facebook
        </a>
      </div>

      <div className="flex flex-row justify-center my-8 w-[75%] mx-auto">
        <span className="absolute bg-slate-900 px-4 text-gray-500">or</span>
        <div className="w-full bg-slate-700 mt-3 h-px"></div>
      </div> */}
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, actions) => {
          if (EmailValidator.validate(values.email)) {

            const expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 3);
            setCookie('cokemail', values.email.toString(), { expires: expirationDate });

            try {
              await supabase.auth.signInWithOtp({ email: values.email });
              router.push("auth/otp");
            } catch (error) {
              alert(error);
            }
          } else {
            alert("add a valid email");
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            {/*             <Field
              require="require"
              type="text"
              name="username"
              className="h-14 text-gray-900 text-sm rounded-lg border-slate-800 focus:ring-orange-500 focus:border-orange-500 block w-full pl-6 pr-32 p-2.5 bg-slate-900 dark:placeholder-slate-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              placeholder="Username"
            />*/}
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

export default Join;
