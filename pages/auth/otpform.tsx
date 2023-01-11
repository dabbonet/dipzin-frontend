import * as React from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { supabase } from "../../client.js";
import Cookies from "js-cookie";

interface OTPFormValues {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
}

const OTPForm: React.FC = () => {
  let cokemail = Cookies.get("cokemail");
  const router = useRouter();

  return (
    <Formik
      className=""
      initialValues={{
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
        otp5: "",
        otp6: "",
      }}
      onSubmit={async (values: OTPFormValues) => {
        const email = cokemail;
        let token =
          values.otp1 +
          values.otp2 +
          values.otp3 +
          values.otp4 +
          values.otp5 +
          values.otp6;
        await supabase.auth
          .verifyOtp({ email, token, type: "magiclink" })
          .then(async (response) => {
            console.log(response);
            Cookies.set("JWT", response.data.session?.access_token);
            if (Cookies.get("JWT") != "undefined") {
              router.push("/home");
            } else {
              alert("err");
            }
          })
          .catch((error) => {
            console.error(error);
            alert(error);
          });
      }}
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col mt-10">
          <div className="flex ">
            <Field
              className="w-[82px] h-[82px] bg-[#27262F] rounded-[16px] flex items-center justify-center text-center text-slate-200 font-medium text-[28px] mr-auto"
              name="otp1"
              maxLength={1}
              onKeyUp={moveToNext}
              onPaste={handlePaste(setFieldValue)}
            />
            <Field
              className="w-[82px] h-[82px] bg-[#27262F] rounded-[16px] flex items-center justify-center text-center text-slate-200 font-medium text-[28px] mr-auto"
              name="otp2"
              maxLength={1}
              onKeyUp={moveToNext}
              onPaste={handlePaste(setFieldValue)}
            />
            <Field
              className="w-[82px] h-[82px] bg-[#27262F] rounded-[16px] flex items-center justify-center text-center text-slate-200 font-medium text-[28px] mr-auto"
              name="otp3"
              maxLength={1}
              onKeyUp={moveToNext}
              onPaste={handlePaste(setFieldValue)}
            />
            <Field
              className="w-[82px] h-[82px] bg-[#27262F] rounded-[16px] flex items-center justify-center text-center text-slate-200 font-medium text-[28px] mr-auto"
              name="otp4"
              maxLength={1}
              onKeyUp={moveToNext}
              onPaste={handlePaste(setFieldValue)}
            />
            <Field
              className="w-[82px] h-[82px] bg-[#27262F] rounded-[16px] flex items-center justify-center text-center text-slate-200 font-medium text-[28px] mr-auto"
              name="otp5"
              maxLength={1}
              onKeyUp={moveToNext}
              onPaste={handlePaste(setFieldValue)}
            />
            <Field
              className="w-[82px] h-[82px] bg-[#27262F] rounded-[16px] flex items-center justify-center text-center text-slate-200 font-medium text-[28px] "
              name="otp6"
              maxLength={1}
              onKeyUp={moveToNext}
              onPaste={handlePaste(setFieldValue)}
            />
            <ErrorMessage name="otp1" />
            <ErrorMessage name="otp2" />
            <ErrorMessage name="otp3" />
            <ErrorMessage name="otp4" />
            <ErrorMessage name="otp5" />
            <ErrorMessage name="otp6" />
          </div>

          <button
            className="w-[100%] py-5 px-3 rounded-xl mt-6 font-semibold text-lg text-white bg-gradient-to-br from-orange-600 to-amber-600 hover:to-amber-500"
            type="submit"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

const moveToNext = (event: any) => {
  const { target } = event;
  const { value } = target;
  const { name } = target;

  if (value.length === 1) {
    const fields = ["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"];
    const currentIndex = fields.indexOf(name);
    if (currentIndex < fields.length - 1) {
      const nextField = document.getElementsByName(fields[currentIndex + 1])[0];
      nextField.focus();
    }
  } else if (value.length === 0) {
    const fields = ["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"];
    const currentIndex = fields.indexOf(name);
    if (currentIndex > 0) {
      const prevField = document.getElementsByName(fields[currentIndex - 1])[0];
      prevField.focus();
    }
  }
};

const handlePaste =
  (setFieldValue: (field: string, value: any) => void) => (event: any) => {
    const { target } = event;
    const { name } = target;

    const pastedValue = event.clipboardData.getData("text");
    if (pastedValue.length === 6) {
      const fields = ["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"];
      const currentIndex = fields.indexOf(name);
      const otpChars = pastedValue.split("");
      for (let i = currentIndex; i < fields.length; i++) {
        setFieldValue(fields[i], otpChars[i]);
      }
    }

    event.preventDefault();
  };

export default OTPForm;
