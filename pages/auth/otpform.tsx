import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface OTPFormValues {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
}

const OTPForm: React.FC = () => {
  return (
    <Formik
      initialValues={{
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
        otp5: "",
        otp6: "",
      }}
      onSubmit={(values: OTPFormValues) => {
        // submit the form
      }}
    >
      {() => (
        <Form className="flex">
          <Field
            className="w-[82px] h-[82px] bg-[#27262F] rounded-[16px] flex items-center justify-center text-center text-slate-200 font-medium text-[28px] mr-[24px]"
            name="otp1"
            maxLength={1}
            onKeyUp={moveToNext}
          />
          <Field
            className="w-[82px] h-[82px] bg-[#27262F] rounded-[16px] flex items-center justify-center text-center text-slate-200 font-medium text-[28px] mr-[24px]"
            name="otp2"
            maxLength={1}
            onKeyUp={moveToNext}
          />
          <Field
            className="w-[82px] h-[82px] bg-[#27262F] rounded-[16px] flex items-center justify-center text-center text-slate-200 font-medium text-[28px] mr-[24px]"
            name="otp3"
            maxLength={1}
            onKeyUp={moveToNext}
          />
          <Field
            className="w-[82px] h-[82px] bg-[#27262F] rounded-[16px] flex items-center justify-center text-center text-slate-200 font-medium text-[28px] mr-[24px]"
            name="otp4"
            maxLength={1}
            onKeyUp={moveToNext}
          />
          <Field
            className="w-[82px] h-[82px] bg-[#27262F] rounded-[16px] flex items-center justify-center text-center text-slate-200 font-medium text-[28px] mr-[24px]"
            name="otp5"
            maxLength={1}
            onKeyUp={moveToNext}
          />
          <Field
            className="w-[82px] h-[82px] bg-[#27262F] rounded-[16px] flex items-center justify-center text-center text-slate-200 font-medium text-[28px] mr-[24px]"
            name="otp6"
            maxLength={1}
            onKeyUp={moveToNext}
          />
          <ErrorMessage name="otp1" />
          <ErrorMessage name="otp2" />
          <ErrorMessage name="otp3" />
          <ErrorMessage name="otp4" />
          <ErrorMessage name="otp5" />
          <ErrorMessage name="otp6" />
          <button type="submit">Submit</button>
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
  }
};

export default OTPForm;
