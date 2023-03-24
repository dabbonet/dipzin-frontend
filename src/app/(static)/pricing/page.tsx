// import { ReactElement, useState, useRef, useEffect } from "react";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <>
      <main className="w-full flex flex-col items-center text-white">
        <div className="flex flex-col text-start w-[75%] mt-[120px] mb-[100px]">
          <span className="text-orange-500 font-semibold text-[16px] mb-1">
            Beta Pricing
          </span>
          <span className="text-[64px] mb-2">Simple, transparent pricing</span>
          <span className="text-[20px] text-slate-300">
            We believe Untitled should be accessible to all companies, no matter
            the size.
          </span>
        </div>

        <div className="gap-6 py-3 bg-slate-800 rounded-full flex items-center justify-center flex-wrap flex-row px-4">
          <div className="px-10 h-[45px] bg-slate-900 flex justify-center items-center rounded-full">
            <span className="font-semibold text-slate-200 text-[20px]">
              MONTHLY
            </span>
          </div>
          <div className="pl-10 pr-5 h-[45px] bg-orange-500 flex justify-center items-center rounded-full">
            <span className="font-semibold text-slate-200 text-[20px]">
              QUARTERLY
            </span>
            <div className="h-7 bg-orange-200 flex justify-center items-center rounded-lg px-3 ml-5 mr-auto">
              <span className="text-orange-700 font-semibold text-[14px]">
                Save 35%
              </span>
            </div>
          </div>
          <div className="pl-10 pr-5 h-[45px] bg-slate-900 flex justify-center items-center rounded-full">
            <span className="font-semibold text-slate-200 text-[20px]">
              ANNUALLY
            </span>
            <div className="h-7 bg-emerald-200 flex justify-center items-center rounded-lg px-3 ml-5 mr-auto">
              <span className="text-emerald-700 font-semibold text-[14px]">
                Save 35%
              </span>
            </div>
          </div>
        </div>

        <div className=" flex flex-wrap flex-row justify-center gap-8 mt-12">
          <div className="w-[445px] h-auto py-7 px-7 bg-slate-800 rounded-[50px] flex flex-col">
            <span className="font-medium text-[28px] mb-3">Free</span>
            <span className="font-medium text-[19px] text-slate-300">
              Great for freelancers
            </span>
            <span className="font-semibold text-[70px] ">
              0{" "}
              <span className="font-semibold text-[46px] text-slate-300">
                $
              </span>
            </span>
            <span className="font-medium text-[18px] text-slate-300">
              Monthely
            </span>
            <div className="ml-3 mt-5 mb-7">
              <div className="flex items-center mb-2">
                <span className="mr-2">
                  <img src="/images/assets/check.svg" alt="check" />
                </span>
                <span className="font-medium text-[19px] ml-1">
                  Download & Copy PNGs
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="mr-2">
                  <img src="/images/assets/check.svg" alt="check" />
                </span>
                <span className="font-medium text-[19px] ml-1">
                  3 Collections
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="mr-2">
                  <img src="/images/assets/check.svg" alt="check" />
                </span>
                <span className="font-medium text-[19px] ml-1">
                  Limited Search & Filters
                </span>
              </div>
            </div>
            <div className="flex mt-auto items-center justify-center w-[100%] h-[52px] bg-[#0B1321] mx-auto rounded-[26px]">
              <span>Get Started</span>
            </div>
          </div>

          <div className="w-[445px] h-auto py-7 px-7 bg-slate-800 rounded-[50px] flex flex-col">
            <span className="font-medium text-[28px] mb-3">Subscription</span>
            <span className="font-medium text-[19px] text-slate-300">
              Great for freelancers
            </span>
            <div className="flex">
              <div>
                <span className="font-semibold text-[70px] relative ">
                  6.99{" "}
                  <span className="font-semibold text-[46px] text-slate-300">
                    $
                  </span>
                  <img
                    src="/images/assets/Rectangle.svg"
                    className=" absolute top-[50%] translate-y-[-50%]"
                  />
                </span>
                <div className=" flex flex-row gap-[45px] items-center w-fit">
                  <span className="font-medium text-[18px] text-slate-300">
                    Quarterly
                  </span>
                  <span className=" font-[700] text-[#EA580C] text-[27px]">
                    3.99
                  </span>
                </div>
              </div>
              <div>
                <span className=" block text-[18.200px] text-[#EA580C] -rotate-15 ml-[6px]">
                  Beta Pricing
                </span>
                <img src="images/assets/Frame.svg" className="ml-[20px]" />
              </div>
            </div>
            <div className="ml-3 mt-5 mb-7">
              <div className="flex items-center mb-2">
                <span className="mr-2">
                  <img src="/images/assets/check.svg" alt="check" />
                </span>
                <span className="font-medium text-[19px] ml-1">
                  Download in bulk
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="mr-2">
                  <img src="/images/assets/check.svg" alt="check" />
                </span>
                <span className="font-medium text-[19px] ml-1">
                  Select and Copy
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="mr-2">
                  <img src="/images/assets/check.svg" alt="check" />
                </span>
                <span className="font-medium text-[19px] ml-1">
                  Unlimited Collections
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="mr-2">
                  <img src="/images/assets/check.svg" alt="check" />
                </span>
                <span className="font-medium text-[19px] ml-1">
                  Unlimited Search & Filters
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center w-[100%] h-[52px] bg-[#0B1321] mx-auto rounded-[26px]">
              <span>Get Started</span>
            </div>
          </div>

          <div className="w-[445px] h-auto py-7 px-7 bg-slate-800 rounded-[50px] flex flex-col">
            <span className="font-medium text-[28px] mb-3">Team</span>
            <span className="font-medium text-[19px] text-slate-300">
              Great for freelancers
            </span>
            <span className=" font-[600] text-[56px] ">Coming Soon</span>
            <div className="ml-3 mt-5 mb-7">
              <div className="flex items-center mb-2">
                <span className="mr-2">
                  <img src="/images/assets/check.svg" alt="check" />
                </span>
                <span className="font-medium text-[19px] ml-1">
                  Team Collections
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="mr-2">
                  <img src="/images/assets/check.svg" alt="check" />
                </span>
                <span className="font-medium text-[19px] ml-1">Team Admin</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="mr-2">
                  <img src="/images/assets/check.svg" alt="check" />
                </span>
                <span className="font-medium text-[19px] ml-1">
                  Centralised Billing
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="mr-2">
                  <img src="/images/assets/check.svg" alt="check" />
                </span>
                <span className="font-medium text-[19px] ml-1">
                  Seat-based Pricing
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center w-[100%] h-[52px] bg-[#0B1321] mx-auto rounded-[26px]">
              <span>Get Started</span>
            </div>
          </div>
        </div>

        <div className="mt-[123px] flex flex-wrap gap-[80px] justify-center">
          <div className="flex flex-col">
            <span className="font-[600] text-[40px]">Plan Comparison</span>
            <span className="font-[400] text-[18px] text-[#94A3B8] ">
              Find your best subscription.
            </span>
          </div>
          <div className="flex flex-wrap flex-row justify-center gap-48 ">
            <div className="flex flex-col">
              <span className="mb-[8px] font-[600] text-[25.2px] text-[#F1F5F9]">
                Free
              </span>
              <span className="font-[600] text-[28px] text-[#F1F5F9] mb-[20px]">
                Free
              </span>
              <button className="text-[#F1F5F9] bg-[#F97316] px-[32px] py-[11px] rounded-[11.2px]">
                Get Started
              </button>
            </div>
            <div className="flex flex-col">
              <span className="mb-[8px] font-[600] text-[25.2px] text-[#F1F5F9]">
                Personal
              </span>
              <span className="font-[600] text-[28px] text-[#F1F5F9] mb-[20px]">
                $49
                <span className="text-[#94A3B8] text-[16.8px] ml-1">
                  /month
                </span>
              </span>
              <button className="text-[#F1F5F9] bg-[#F97316] px-[32px] py-[11px] rounded-[11.2px]">
                Get Started
              </button>
            </div>
            <div className="flex flex-col">
              <span className="mb-[8px] font-[600] text-[25.2px] text-[#F1F5F9]">
                Team
              </span>
              <span className="font-[600] text-[28px] text-[#F1F5F9] mb-[20px]">
                Coming Soon...
              </span>
              <button className="text-[#F1F5F9] bg-[#F97316] px-[32px] py-[11px] rounded-[11.2px]">
                Get Started
              </button>
            </div>
          </div>
        </div>
        {/* table */}
        <div className="mt-[70px] w-[90%]">
          <span className="font-[600] text-2xl mb-8 block">Features</span>
          <div className="flex flex-col">
            <div className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">All Apps Access</span>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
            </div>
            <div className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Latest Version</span>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
            </div>
            <div className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Image Copy & Download
                </span>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
            </div>
            <div className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Bulk download</span>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Limited</span>
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
            </div>
            <div className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <div className="flex flex-row lg:gap-5 gap-1 justify-center items-center">
                  <span className="font-[500] lg:text-lg text-sm sm:text-base">Flows</span>
                  <span className="bg-[#FCEED9] rounded text-[#383B3D] py-1 px-2 font-[400] text-xs">
                    soon
                  </span>
                </div>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Limited</span>
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Unlimited</span>
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Unlimited</span>
              </span>
            </div>
            <div className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Search and Filters</span>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Limited</span>
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Unlimited</span>
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Unlimited</span>
              </span>
            </div>
            <div className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Collections</span>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Limited</span>
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Unlimited</span>
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Unlimited</span>
              </span>
            </div>
            <div className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Team Members</span>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-False.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-False.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
            </div>
            <div className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Team Collections</span>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-False.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-False.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
            </div>
            <div className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Centeralized Billing</span>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-False.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-False.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
            </div>
            <div className="flex flex-row py-7 border-y border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">Seat-based Pricing</span>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-False.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-False.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <img src="/images/assets/Frame-check.svg" alt="" />
              </span>
            </div>
          </div>
        </div>

        <div className=" mt-20">
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1E293B] bg-opacity-50 col-span-1 lg:col-span-2 rounded-[36px] px-14">
            </div>
            <div className="bg-[#1E293B] bg-opacity-50 flex flex-col rounded-[36px] px-14">
              <div className=" mt-16">
                <img src="/images/assets/image.svg" alt="" />
              </div>
              <span className="font-[500] text-3xl my-4">
                Customizable Collections
              </span>
              <span className="font-[400] text-lg text-[#94A3B8]">
                Dipzin offers customizable collections of app and screen
                designs, empowering designers to create personalized and
                effective designs tailored to specific projects.
              </span>
            </div>
            <div className="bg-[#1E293B] bg-opacity-50 flex flex-col rounded-[36px] px-14">
              <div className=" mt-16">
                <img src="/images/assets/image.svg" alt="" />
              </div>
              <span className="font-[500] text-3xl my-4">
                Search capability for easy navigation{" "}
              </span>
              <span className="font-[400] text-lg text-[#94A3B8]">
                With Dipzin's search capability, designers can effortlessly find
                design elements to bring their vision to life, unlocking endless
                creative possibilities.
              </span>
            </div>
            <div className="bg-[#1E293B] bg-opacity-50 flex flex-col rounded-[36px] px-14">
              <div className=" mt-16">
                <img src="/images/assets/image.svg" alt="" />
              </div>
              <span className="font-[500] text-3xl my-4">
                Categorized patterns{" "}
              </span>
              <span className="font-[400] text-lg text-[#94A3B8]">
                Categorized patterns organize design elements for easy access,
                saving designers time and helping them find new design ideas.
              </span>
            </div>
            <div className="bg-[#1E293B] bg-opacity-50 flex flex-col rounded-[36px] px-14">
              <div className=" mt-16">
                <img src="/images/assets/image.svg" alt="" />
              </div>
              <span className="font-[500] text-3xl my-4">
                User-friendly interface{" "}
              </span>
              <span className="font-[400] text-lg text-[#94A3B8]">
                Dipzin's user interface is designed with simplicity and
                efficiency in mind, enabling you to focus on your creativity and
                design process. bringing your vision to life.
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Page;
