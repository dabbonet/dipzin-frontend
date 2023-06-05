// import { ReactElement, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Card from "@/components/pricing/Card";
import Pills from "@/components/pricing/Pills";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const Page: NextPage = () => {
  return (
    <>
      {/* full page */}
      <main className=" pt-20 flex flex-col items-center">
        {/* header */}
        <div className=" container w-[90%] mx-auto flex flex-col">
          <span className="text-[#00DBAE] font-[600] text-base">
            Beta Pricing
          </span>
          <h1 className="font-[400] md:text-4xl text-2xl lg:text-6xl mb-6">
            Simple, transparent pricing
          </h1>
          <span className=" text-[#949DAD] text-xs md:text-sm lg:text-base">
            We believe Dipzin should be accessible to all companies, no matter
            the size.
          </span>
        </div>
        {/* pills */}
        <div className=" container w-[90%] flex justify-center mt-20">
          <div className=" w-fit flex flex-wrap gap-x-6 justify-center gap-y-3 bg-slate-700 py-3 px-4 rounded-full">
            <Pills pillType="MONTHLY" />
            <Pills pillType="QUARTERLY" sale="35%" />
            <Pills pillType="ANNUALLY" sale="35%" />
          </div>
        </div>
        {/* cards */}
        <div className=" container w-[90%] grid lg:grid-cols-3 gap-3 md:grid-cols-2 grid-cols-1">
          <Card
            subscribeName="Free"
            price={0}
            features={[
              "Download & Copy PNGs",
              "3 Collections",
              "Limited Search & Filters",
            ]}
            pricing
            price_per="Monthly"
          />
          <Card
            subscribeName="Personal"
            price={6.99}
            pricing
            features={[
              "Download in bulk",
              "Select and Copy",
              "Unlimited Collections",
              "Unlimited Search & Filters",
            ]}
            price_per="Quarterly"
            sale
            overSale={3.99}
          />
          <Card
            subscribeName="Team"
            features={[
              "Team Collections",
              "Team Admin",
              "Centralised Billing ",
              "Seat-based Pricing",
              
            ]}
            pricing
          />
        </div>
        {/* table */}

        <table className="container w-[90%] mt-32">
          <thead>
            <tr className=" flex flex-row justify-between items-center">
              <td>
                <h2 className=" font-[600] lg:text-3xl md:text-lg sm:text-base text-sm mb-2">
                  Plan Comparison
                </h2>
                <span className=" text-slate-400 font-medium lg:text-base md:text-start text-xs">
                  Find your best subscription.
                </span>
              </td>
              <td>
                <h5 className=" text-slate-100 lg:text-xl md:text-base sm:text-sm text-xs">
                  Free
                </h5>
                <h4 className=" text-slate-100 font-[600]  lg:text-2xl md:text-lg sm:text-sm text-xs mb-5">
                  Free
                </h4>
                <button className=" text-sm lg:text-base py-3 lg:px-8 md:px-6 sm:px-4 px-2 bg-[#00DBAE] rounded-xl">
                  Get Started
                </button>
              </td>
              <td>
                <h5 className=" text-slate-100 lg:text-xl md:text-base sm:text-sm text-xs ">
                  Personal
                </h5>
                <h4 className=" text-slate-100 font-[600]  lg:text-2xl md:text-lg sm:text-sm text-xs mb-5">
                  $49
                  <span className=" text-slate-400 lg:text-base md:text-sm text-xs">
                    /month
                  </span>
                </h4>
                <button className=" text-sm lg:text-base py-3 lg:px-8 md:px-6 sm:px-4 px-2 bg-[#00DBAE] rounded-xl">
                  Get Started
                </button>
              </td>
              <td>
                <h5 className=" text-slate-100 lg:text-xl md:text-base sm:text-sm text-xs ">
                  Team
                </h5>
                <h4 className=" text-slate-100 font-[600] lg:text-2xl md:text-lg sm:text-sm text-xs mb-5">
                  Coming Soon...
                </h4>
                <button className=" text-xs lg:text-base py-3 lg:px-8 md:px-4 sm:px-2 px-1 bg-[#00DBAE] rounded-xl">
                  Get Started
                </button>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td>
                <h3 className=" mb-8 text-slate-100 lg:text-2xl md:text-lg sm:text-base text-xs">
                  Features
                </h3>
              </td>
            </tr>

            <tr className=" flex flex-row justify-between itece py-7 border-solid border-t border-slate-700">
              <td className=" flex justify-between flex-1">
                <span className=" lg:text-base md:text-sm text-xs">
                  All Apps Access
                </span>
                <Image
                  unoptimized
                  src="/images/assets/svg.svg"
                  title="All Apps Access"
                  alt=""
                  width={24}
                  height={24}
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-check.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-check.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-check.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </td>
            </tr>
            <tr className=" flex flex-row justify-between itece py-7 border-solid border-t border-slate-700">
              <td className=" flex justify-between flex-1">
                <span className=" lg:text-base md:text-sm text-xs">
                  Latest Version
                </span>
                <Image
                  unoptimized
                  src="/images/assets/svg.svg"
                  width={24}
                  height={24}
                  title="Latest Version"
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-check.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-check.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-check.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
            </tr>
            <tr className=" flex flex-row justify-between itece py-7 border-solid border-t border-slate-700">
              <td className=" flex justify-between flex-1">
                <span className=" lg:text-base md:text-sm text-xs">
                  Image Copy & Download
                </span>
                <Image
                  unoptimized
                  src="/images/assets/svg.svg"
                  title="Image Copy & Download"
                  alt=""
                  width={24}
                  height={24}
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-check.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-check.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-check.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
            </tr>
            <tr className=" flex flex-row justify-between itece py-7 border-solid border-t border-slate-700">
              <td className=" flex justify-between flex-1">
                <span className=" lg:text-base md:text-sm text-xs">
                  Bulk download
                </span>
                <Image
                  unoptimized
                  src="/images/assets/svg.svg"
                  width={24}
                  height={24}
                  title="Bulk download"
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <span className=" lg:text-base md:text-sm text-xs">
                  Limited
                </span>
              </td>
              <td className="flex-1 flex justify-center">
                <img
                  className=" w-6 h-6"
                  src="/images/assets/Frame-check.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-check.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
            </tr>
            <tr className=" flex flex-row justify-between itece py-7 border-solid border-t border-slate-700">
              <td className=" flex justify-between flex-1">
                <div className=" lg:text-base md:text-sm text-xs flex flex-wrap gap-4">
                  Flows
                  <span className=" py-1 px-2 bg-[#98FFE1] rounded text-[#383B3D]">
                    Soon
                  </span>
                </div>
                <Image
                  unoptimized
                  src="/images/assets/svg.svg"
                  width={24}
                  height={24}
                  title="Flows"
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <span className=" lg:text-base md:text-sm text-xs">
                  Limited
                </span>
              </td>
              <td className="flex-1 flex justify-center">
                <span className=" lg:text-base md:text-sm text-xs">
                  Unlimited
                </span>
              </td>
              <td className="flex-1 flex justify-center">
                <span className=" lg:text-base md:text-sm text-xs">
                  Unlimited
                </span>
              </td>
            </tr>
            <tr className=" flex flex-row justify-between itece py-7 border-solid border-t border-slate-700">
              <td className=" flex justify-between flex-1">
                <span className=" lg:text-base md:text-sm text-xs">
                  Search and Filters
                </span>
                <Image
                  unoptimized
                  width={24}
                  height={24}
                  src="/images/assets/svg.svg"
                  title="Search and Filters"
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <span className=" lg:text-base md:text-sm text-xs">
                  Limited
                </span>
              </td>
              <td className="flex-1 flex justify-center">
                <span className=" lg:text-base md:text-sm text-xs">
                  Unlimited
                </span>
              </td>
              <td className="flex-1 flex justify-center">
                <span className=" lg:text-base md:text-sm text-xs">
                  Unlimited
                </span>
              </td>
            </tr>
            <tr className=" flex flex-row justify-between itece py-7 border-solid border-t border-slate-700">
              <td className=" flex justify-between flex-1">
                <span className=" lg:text-base md:text-sm text-xs">
                  Collections
                </span>
                <Image
                  unoptimized
                  src="/images/assets/svg.svg"
                  width={24}
                  height={24}
                  title="Collections"
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <span className=" lg:text-base md:text-sm text-xs">
                  Limited
                </span>
              </td>
              <td className="flex-1 flex justify-center">
                <span className=" lg:text-base md:text-sm text-xs">
                  Unlimited
                </span>
              </td>
              <td className="flex-1 flex justify-center">
                <span className=" lg:text-base md:text-sm text-xs">
                  Unlimited
                </span>
              </td>
            </tr>
            <tr className=" flex flex-row justify-between itece py-7 border-solid border-t border-slate-700">
              <td className=" flex justify-between flex-1">
                <span className=" lg:text-base md:text-sm text-xs">
                  Team Members
                </span>
                <Image
                  unoptimized
                  src="/images/assets/svg.svg"
                  width={24}
                  height={24}
                  title="Team Members"
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-False.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-False.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  width={24}
                  height={24}
                  src="/images/assets/Frame-False.svg"
                  alt=""
                />
              </td>
            </tr>
            <tr className=" flex flex-row justify-between itece py-7 border-solid border-t border-slate-700">
              <td className=" flex justify-between flex-1">
                <span className=" lg:text-base md:text-sm text-xs">
                  Team Collections
                </span>
                <Image
                  unoptimized
                  src="/images/assets/svg.svg"
                  width={24}
                  height={24}
                  title="Team Collections"
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-False.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-False.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-False.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </td>
            </tr>
            <tr className=" flex flex-row justify-between itece py-7 border-solid border-t border-slate-700">
              <td className=" flex justify-between flex-1">
                <span className=" lg:text-base md:text-sm text-xs">
                  Centeralized Billing
                </span>
                <Image
                  unoptimized
                  src="/images/assets/svg.svg"
                  width={24}
                  height={24}
                  title="Centeralized Billing"
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-False.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-False.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-False.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
            </tr>
            <tr className=" flex flex-row justify-between itece py-7 border-solid border-t border-slate-700">
              <td className=" flex justify-between flex-1">
                <span className=" lg:text-base md:text-sm text-xs">
                  Seat-based Pricing
                </span>
                <Image
                  unoptimized
                  src="/images/assets/svg.svg"
                  width={24}
                  height={24}
                  title="Seat-based Pricing"
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-False.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-False.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
              <td className="flex-1 flex justify-center">
                <Image
                  unoptimized
                  className=" w-6 h-6"
                  src="/images/assets/Frame-False.svg"
                  width={24}
                  height={24}
                  alt=""
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* grid */}
        <div className=" mt-20 container w-[90%]">
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800 bg-opacity-50 col-span-1 lg:col-span-2 rounded-[36px] lg:px-14 md:px-10 sm:px-6 px-3">
              <h1 className=" text-4xl text-orange-700 mt-24">
                Boost Your Design <br /> Workflow
              </h1>
              <p className=" text-slate-400 text-lg mt-20">
                We offer an organized , structured and well categorized database
                of user experience and interface design patterns of mobile apps/
                Websites  These aren't the imaginary designs or theoretical
                components seen on Dribble or pinterest. Not "might work"
                prototypes and art pieces. These are genuine, applied designs
                that have been tested, validated, and are now in use by real
                people. We simply share the success formula with the UI/UX
                designers
              </p>
            </div>
            <div className="bg-slate-800 bg-opacity-50 flex flex-col rounded-[36px] lg:px-14 md:px-10 sm:px-6 px-3">
              <div className=" mt-16">
                <Image
                  unoptimized
                  src="/images/assets/image.svg"
                  width={342}
                  height={213.02}
                  alt=""
                />
              </div>
              <span className="font-[500] lg:text-3xl md:text-xl text-base my-4">
                Customizable Collections
              </span>
              <span className="font-[400] lg:text-lg md:tex text-xs text-slate-400 mb-8">
                Dipzin offers customizable collections of app and screen
                designs, empowering designers to create personalized and
                effective designs tailored to specific projects.
              </span>
            </div>
            <div className="bg-slate-800 bg-opacity-50 flex flex-col rounded-[36px] lg:px-14 md:px-10 sm:px-6 px-3">
              <div className=" mt-16">
                <Image
                  unoptimized
                  src="/images/assets/image.svg"
                  width={342}
                  height={213.02}
                  alt=""
                />
              </div>
              <span className="font-[500] lg:text-3xl md:text-xl text-base my-4">
                Search capability for easy navigation
              </span>
              <span className="font-[400] lg:text-lg md:tex text-xs text-slate-400 mb-8">
                With Dipzin's search capability, designers can effortlessly find
                design elements to bring their vision to life, unlocking endless
                creative possibilities.
              </span>
            </div>
            <div className="bg-slate-800 bg-opacity-50 flex flex-col rounded-[36px] lg:px-14 md:px-10 sm:px-6 px-3">
              <div className=" mt-16">
                <Image
                  unoptimized
                  src="/images/assets/image.svg"
                  width={342}
                  height={213.02}
                  alt=""
                />
              </div>
              <span className="font-[500] lg:text-3xl md:text-xl text-base my-4">
                Categorized patterns
              </span>
              <span className="font-[400] lg:text-lg md:tex text-xs text-slate-400 mb-8">
                Categorized patterns organize design elements for easy access,
                saving designers time and helping them find new design ideas.
              </span>
            </div>
            <div className="bg-slate-800 bg-opacity-50 flex flex-col rounded-[36px] lg:px-14 md:px-10 sm:px-6 px-3">
              <div className=" mt-16">
                <Image
                  unoptimized
                  src="/images/assets/image.svg"
                  width={342}
                  height={213.02}
                  alt=""
                />
              </div>
              <span className="font-[500] lg:text-3xl md:text-xl text-base my-4">
                User-friendly interface
              </span>
              <span className="font-[400] lg:text-lg md:tex text-xs text-slate-400 mb-8">
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
export default dynamic(() => Promise.resolve(Page), { ssr: false });
