"use client";

import { Formik, Form, Field } from "formik";
import Image from "next/image";
import Link from "next/link";

type Props = {};
const Page = (props: Props) => {
  return (
    <div className="mx-auto w-full max-w-md">
      <div>
        <h2 className="mt-6 text-3xl font-bold text-white">
          Account Verification
        </h2>
        <p className="mt-2 text-sm text-gray-200">
          Welcome back! Please enter the verification code sent to your email.
        </p>
      </div>

      <div className="mt-8">
        <div className="mt-6">
          <Formik
            initialValues={{
              otp0: "",
              otp1: "",
              otp2: "",
              otp3: "",
              otp4: "",
              otp5: "",
            }}
            onSubmit={() => {}}
          >
            <Form className="space-y-4">
              <div className="flex justify-between gap-4">
                {new Array(6).fill(0).map((_, i) => (
                  <div className="text-center form-control">
                    <label
                      htmlFor={"otp" + i}
                      className="sr-only block text-sm font-medium text-gray-700"
                    >
                      First digit in verification code
                    </label>
                    <div>
                      <Field
                        id={"otp" + i}
                        name={"otp" + i}
                        type={"otp" + i}
                        autoComplete={"otp" + i}
                        required
                        placeholder="0"
                        className="appearance-none block w-full px-6 py-4 bg-zinc-800 border border-gray-700 rounded-md shadow-sm placeholder-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xl"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                >
                  Confirm
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-200">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-bold text-yellow-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Page;
