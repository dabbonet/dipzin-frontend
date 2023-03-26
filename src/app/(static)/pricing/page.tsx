// import { ReactElement, useState, useRef, useEffect } from "react";
import Pills from "@/components/pricing/Pills";
import Plans from "@/components/pricing/Plans";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center text-white">
        <div className="flex flex-col text-start w-[75%]  mt-32 mb-24">
          <span className="text-orange-500 font-semibold text-base mb-1">
            Beta Pricing
          </span>
          <span className=" text-6xl mb-2">Simple, transparent pricing</span>
          <span className=" text-xl text-slate-300">
            We believe Untitled should be accessible to all companies, no matter
            the size.
          </span>
        </div>

        <div className="gap-6 py-3 bg-slate-800 rounded-full flex items-center justify-center flex-wrap flex-row px-4">
          <div className="px-10 h-11 bg-slate-900 flex justify-center items-center rounded-full">
            <span className="font-semibold text-slate-200 text-xl">
              MONTHLY
            </span>
          </div>
          <div className="pl-10 pr-5 h-11 bg-orange-500 flex justify-center items-center rounded-full">
            <span className="font-semibold text-slate-200  text-xl">
              QUARTERLY
            </span>
            <div className="h-7 bg-orange-200 flex justify-center items-center rounded-lg px-3 ml-5 mr-auto">
              <span className="text-orange-700 font-semibold  text-sm">
                Save 35%
              </span>
            </div>
          </div>
          <div className="pl-10 pr-5 h-11 bg-slate-900 flex justify-center items-center rounded-full">
            <span className="font-semibold text-slate-200 text-xl">
              ANNUALLY
            </span>
            <div className="h-7 bg-emerald-200 flex justify-center items-center rounded-lg px-3 ml-5 mr-auto">
              <span className="text-emerald-700 font-semibold text-sm">
                Save 35%
              </span>
            </div>
          </div>
        </div>

        <div className=" flex flex-wrap flex-row justify-center gap-8 mt-12">
          <Pills
            type="Free"
            features={[
              "Download & Copy PNGs",
              "3 Collections",
              "Limited Search & Filters",
            ]}
            cost={0}
          />

          <Pills
            type="Subscription"
            sale
            cost={6.99}
            features={[
              "Download in bulk",
              "Select and Copy",
              "Unlimited Collections",
              "Unlimited Search & Filters",
            ]}
            payment_per="Quarterly"
          />

          <Pills
            type="Team"
            cost="Coming Soon"
            features={[
              "Team Collections",
              "Team Admin",
              "Centralised Billing ",
              "Seat-based Pricing",
            ]}
          />
        </div>

        {/* plan compareson */}
        {/* <div className=" mt-32 flex flex-wrap flex-row gap-28 items-center w-[90%]">
          <div className="flex flex-col w-full lg:w-fit items-center lg:items-start">
            <span className="font-[600] text-4xl">Plan Comparison</span>
            <span className="font-[400] text-lg text-[#94A3B8] mt-2">
              Find your best subscription.
            </span>
          </div>
          <div className="flex flex-row justify-center gap-48 m-auto">
            <Plans type="Free" cost={"Free"} />
            <Plans type="Personal" cost={49} />
            <Plans type="Team" cost={"Coming Soon..."} />
          </div>
        </div>
        <div className="mt-20 w-[90%]">
          <span className="font-[600] text-2xl mb-8 block">Features</span>
          <div className="flex flex-col">
            
          </div>
        </div> */}
          <table className=" mt-32">
            <thead>
              <tr className=" flex lg:gap-48 md:gap-24 sm:gap-12">
                <td>
                  <div className="flex flex-col w-full lg:w-fit items-center lg:items-start">
                    <span className="font-[600] lg:text-4xl md:text-2xl">
                      Plan Comparison
                    </span>
                    <span className="font-[400] lg:text-lg md:text-base sm:text-sm text-xs text-[#94A3B8] mt-2">
                      Find your best subscription.
                    </span>
                  </div>
                </td>
                <td>
                  <Plans type="Free" cost={"Free"} />
                </td>
                <td>
                  <Plans type="Personal" cost={49} />
                </td>
                <td>
                  <Plans type="Team" cost={"Coming Soon..."} />
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="font-[600] text-2xl mb-8 block">
                    Features
                  </span>
                </td>
              </tr>
              <tr className="flex flex-row  py-7 border-t border-solid border-[#1E293B]">
                <td className="flex-[.85] flex justify-between">
                  <span className="font-[500] lg:text-lg text-sm sm:text-base">
                    All Apps Access
                  </span>
                  <img src="/images/assets/svg.svg" alt="" />
                </td>
                <td className="flex-1 justify-center items-center flex">
                  <img src="/images/assets/Frame-check.svg" alt="" />
                </td>
                <td className="flex-1 justify-center items-center flex">
                  <img src="/images/assets/Frame-check.svg" alt="" />
                </td>
                <td className="flex-1 justify-center items-center flex">
                  <img src="/images/assets/Frame-check.svg" alt="" />
                </td>
              </tr>
              <tr className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
                <span className="flex-[.85] flex justify-between">
                  <span className="font-[500] lg:text-lg text-sm sm:text-base">
                    Latest Version
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
              </tr>
              <tr className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
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
              </tr>
              <tr className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
                <span className="flex-[.85] flex justify-between">
                  <span className="font-[500] lg:text-lg text-sm sm:text-base">
                    Bulk download
                  </span>
                  <img src="/images/assets/svg.svg" alt="" />
                </span>
                <span className="flex-1 justify-center items-center flex">
                  <span className="font-[500] lg:text-lg text-sm sm:text-base">
                    Limited
                  </span>
                </span>
                <span className="flex-1 justify-center items-center flex">
                  <img src="/images/assets/Frame-check.svg" alt="" />
                </span>
                <span className="flex-1 justify-center items-center flex">
                  <img src="/images/assets/Frame-check.svg" alt="" />
                </span>
            </tr>
            <tr className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <div className="flex flex-col md:flex-row lg:gap-5 gap-1 justify-center items-center">
                  <span className="font-[500] lg:text-lg text-sm sm:text-base">
                    Flows
                  </span>
                  <span className="bg-[#FCEED9] rounded text-[#383B3D] py-1 px-2 font-[400] text-xs">
                    soon
                  </span>
                </div>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Limited
                </span>
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Unlimited
                </span>
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Unlimited
                </span>
              </span>
            </tr>
            <tr className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Search and Filters
                </span>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Limited
                </span>
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Unlimited
                </span>
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Unlimited
                </span>
              </span>
            </tr>
            <tr className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Collections
                </span>
                <img src="/images/assets/svg.svg" alt="" />
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Limited
                </span>
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Unlimited
                </span>
              </span>
              <span className="flex-1 justify-center items-center flex">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Unlimited
                </span>
              </span>
            </tr>
            <tr className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Team Members
                </span>
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
            </tr>
            <tr className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Team Collections
                </span>
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
            </tr>
            <tr className="flex flex-row py-7 border-t border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Centeralized Billing
                </span>
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
            </tr>
            <tr className="flex flex-row py-7 border-y border-solid border-[#1E293B]">
              <span className="flex-[.85] flex justify-between">
                <span className="font-[500] lg:text-lg text-sm sm:text-base">
                  Seat-based Pricing
                </span>
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
            </tr>
            </tbody>
          </table>


        <div className=" mt-20">
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1E293B] bg-opacity-50 col-span-1 lg:col-span-2 rounded-[36px] px-14"></div>
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
                Search capability for easy navigation
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
                Categorized patterns
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
                User-friendly interface
              </span>
              <span className="font-[400] text-lg text-[#94A3B8]">
                Dipzin's user interface is designed with simplicity and
                efficiency in mind, enabling you to focus on your creativity and
                design process. bringing your vision to life.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;

{
  /* 
           
            
           
            
            
            
            
            
            
             */
}
