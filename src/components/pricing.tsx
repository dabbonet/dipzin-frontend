'use client'
import Image from "next/image";
import Card, { goToPayment } from "@/components/pricing/Card";
import Pills from "@/components/pricing/Pills";
import Icons from "@/components/Icons";
import { useState } from "react";
import { useDialog } from "@/context/useDialog";

const Pricing = ({ checkOuts }) => {
  const { setVisibleNoAuth } = useDialog()
  const [checkout, setCheckout] = useState(checkOuts[2])
  const PerMonth = checkOuts[2]
  const perThreemonths = checkOuts[1]
  const perYear = checkOuts[0]

  return (
    <>
      {/* full page */}
      <main className="max-w-[90%] mx-auto pt-20 flex flex-col items-center">
        {/* header */}
        <div className=" container w-[90%] mx-auto flex flex-col">
          <span className="text-aqua-500 font-[600] text-base">
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
          <div className=" w-fit flex flex-wrap gap-x-6 justify-center gap-y-3 bg-slate-700/50 py-3 px-4 rounded-full bg-opacity-50">
            <Pills pillType="MONTHLY" sale="" interval={PerMonth} setCheckOut={setCheckout} checkout={checkout} />
            <Pills pillType="QUARTERLY" sale="20%" interval={perThreemonths} setCheckOut={setCheckout} checkout={checkout} />
            <Pills pillType="ANNUALLY" sale="35%" interval={perYear} setCheckOut={setCheckout} checkout={checkout} />
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
            currentPlan
            price_per="Monthly"
          />
          <Card
            subscribeName='Paid'
            price={checkout.unit_amount / 100}
            features={[
              "Download in bulk",
              "Select and Copy",
              "Unlimited Collections",
              "Unlimited Search & Filters",
            ]}
            price_per={checkout.recurring.interval_count + ' ' + checkout.recurring.interval}
            id={checkout.id}

          />
          <Card
            subscribeName="Team"
            features={[
              "Team Collections",
              "Team Admin",
              "Centralised Billing ",
              "Seat-based Pricing",

            ]}

          />
        </div>
        {/* table */}

        <table className="container w-[90%] mt-32">
          <thead>
            <tr className=" flex flex-row  items-center">
              <td className=" flex-1 ">
                <h2 className=" font-[600] lg:text-3xl md:text-lg sm:text-base text-sm mb-2">
                  Plan Comparison
                </h2>
                <span className=" text-slate-400 font-medium lg:text-base md:text-start text-xs">
                  Find your best subscription.
                </span>
              </td>
              <td className=" flex-1 flex flex-col items-center">
                <div className=" w-fit">
                  <h5 className=" text-slate-100 lg:text-xl md:text-base sm:text-sm text-xs">
                    Free
                  </h5>
                  <h4 className=" text-slate-100 font-[600]  lg:text-2xl md:text-lg sm:text-sm text-xs mb-5">
                    $0 <span className=" text-slate-400 lg:text-base md:text-sm text-xs">/month</span>
                  </h4>
                  <button className=" text-sm lg:text-base lg:py-3 py-1 lg:px-8 md:px-6 sm:px-4 px-2 bg-slate-800 rounded-xl">
                    Current Plan
                  </button>
                </div>
              </td>
              <td className=" flex-1 flex flex-col items-center">
                <div className="w-fit">
                  <h5 className=" text-slate-100 lg:text-xl md:text-base sm:text-sm text-xs ">
                    Personal
                  </h5>
                  <h4 className=" text-slate-100 font-[600]  lg:text-2xl md:text-lg sm:text-sm text-xs mb-5">
                    ${checkout.unit_amount / 100}
                    <span className=" text-slate-400 lg:text-base md:text-sm text-xs">
                      /{checkout.recurring.interval}
                    </span>
                  </h4>
                  <button className=" text-sm lg:text-base text-aqua-900 lg:py-3 py-1 lg:px-8 md:px-6 sm:px-4 px-2 bg-aqua-500 rounded-xl" onClick={() => goToPayment(checkout.id, setVisibleNoAuth)}>
                    Get Started
                  </button>
                </div>
              </td>
              <td className=" flex-1 flex flex-col items-center">
                <div className=" w-fit">
                  <h5 className=" text-slate-100 lg:text-xl md:text-base sm:text-sm text-xs ">
                    Team
                  </h5>
                  <h4 className=" text-slate-100 font-[600] lg:text-4xl md:text-lg sm:text-sm text-xs mb-5">
                    Coming <br /> Soon...
                  </h4>
                </div>
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
                {/* <div className={`tooltip`}>
                  <Image
                    unoptimized
                    src="/images/assets/svg.svg"
                    alt=""
                    width={24}
                    height={24}

                  />
                  <span>We update our database in weekly base so you will get the latest versions from production to dipzin.</span>
                </div> */}
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
                {/* <div className={`tooltip`}>
                  <Image
                    unoptimized
                    src="/images/assets/svg.svg"
                    width={24}
                    height={24}
                    alt=""

                  />
                  <span>We update our database in weekly base so you will get the latest versions from production to dipzin.</span>
                </div> */}
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
                {/* <div className={`tooltip`}>
                  <Image
                    unoptimized
                    src="/images/assets/svg.svg"
                    width={24}
                    height={24}
                    alt=""

                  />
                  <span>We update our database in weekly base so you will get the latest versions from production to dipzin.</span>
                </div> */}
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
                {/* <div className={`tooltip`}>
                  <Image
                    unoptimized
                    src="/images/assets/svg.svg"
                    width={24}
                    height={24}
                    alt=""

                  />
                  <span>We update our database in weekly base so you will get the latest versions from production to dipzin.</span>
                </div> */}
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
                  <span className="px-2 bg-aqua-200 rounded-lg text-aqua-950">
                    Soon
                  </span>
                </div>
                {/* <div className={`tooltip`}>
                  <Image
                    unoptimized
                    src="/images/assets/svg.svg"
                    width={24}
                    height={24}
                    title="Flows"
                    alt=""

                  />
                  <span>We update our database in weekly base so you will get the latest versions from production to dipzin.</span>
                </div> */}
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
                {/* <div className={`tooltip`}>
                  <Image
                    unoptimized
                    width={24}
                    height={24}
                    src="/images/assets/svg.svg"
                    alt=""

                  />
                  <span>We update our database in weekly base so you will get the latest versions from production to dipzin.</span>
                </div> */}
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
                {/* <div className={`tooltip`}>
                  <Image
                    unoptimized
                    src="/images/assets/svg.svg"
                    width={24}
                    height={24}
                    alt=""

                  />
                  <span>We update our database in weekly base so you will get the latest versions from production to dipzin.</span>
                </div> */}
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
                {/* <div className={`tooltip`}>
                  <Image
                    unoptimized
                    src="/images/assets/svg.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <span>We update our database in weekly base so you will get the latest versions from production to dipzin.</span>
                </div> */}
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
                {/* <div className={`tooltip`}>
                  <Image
                    unoptimized
                    src="/images/assets/svg.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <span>We update our database in weekly base so you will get the latest versions from production to dipzin.</span>
                </div> */}
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
                {/* <div className={`tooltip`}>
                  <Image
                    unoptimized
                    src="/images/assets/svg.svg"
                    width={24}
                    height={24}
                    alt=""

                  />
                  <span>We update our database in weekly base so you will get the latest versions from production to dipzin.</span>
                </div> */}
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
                {/* <div className={`tooltip`}>
                  <Image
                    unoptimized
                    src="/images/assets/svg.svg"
                    width={24}
                    height={24}
                    alt=""

                  />
                  <span>We update our database in weekly base so you will get the latest versions from production to dipzin.</span>
                </div> */}
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
        <div className=" my-20 container w-[90%]">
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800 bg-opacity-50 col-span-1 lg:col-span-2 rounded-[36px] py-14 lg:px-14 md:px-10 sm:px-6 px-3 text-center flex items-end h-[509px]">
              <div className=" w-fit h-fit">
                <span className=" block mt-auto text-slate-400">Unlimited Screens</span>
                <h1 className=" lg:text-3xl md:text-xl text-base my-4 ">Boost Your Design Workflow</h1>
                <p className=" text-slate-400">Dipzin stands out with its extensive collection of tagged screenshots, curated from renowned designers across industries. Explore our vast database for new design trends, innovative interfaces, and creative solutions. Dive into beautifully crafted apps, learn from industry leaders, and infuse fresh ideas into your projects.</p>
              </div>
            </div>
            <div className="bg-slate-800 bg-opacity-50 flex items-end rounded-[36px] lg:px-14 md:px-10 sm:px-6 px-3 py-14 h-[509px]">
              <div className=" w-fit h-fit text-center">
                <span className=" block mt-auto text-slate-400">Customizable Collections</span>
                <h1 className=" lg:text-3xl md:text-xl text-base my-4 ">Collaborative Sharing</h1>
                <p className=" text-slate-400">Coming soon, easily categorize, sort, and access your favorite screenshots in Dipzin's unlimited collection feature for an efficient workflow.</p>
              </div>
            </div>
            <div className="bg-slate-800 bg-opacity-50 flex items-end rounded-[36px] lg:px-14 md:px-10 sm:px-6 px-3 py-14 h-[509px]">
              <div className=" w-fit h-fit text-center">
                <span className=" block mt-auto text-slate-400">Advanced Search</span>
                <h1 className=" lg:text-3xl md:text-xl text-base my-4 ">Find with Precision</h1>
                <p className=" text-slate-400">Discover designs that resonate with your project, save time, and focus on creating amazing designs with Dipzin's precise search capabilities.</p>
              </div>
            </div>
            <div className="bg-slate-800 bg-opacity-50 flex items-end rounded-[36px] lg:px-14 md:px-10 sm:px-6 px-3 py-14 h-[509px]">
              <div className=" w-fit h-fit text-center">
                <span className=" block mt-auto text-slate-400">Comprehensive Tagging</span>
                <h1 className=" lg:text-3xl md:text-xl text-base my-4 ">Simplified Inspiration Discovery</h1>
                <p className=" text-slate-400">Navigate tagged designs by Category, Pattern, Components, and more for efficient organization and seamless inspiration discovery.</p>
              </div>
            </div>
            <div className="bg-slate-800 bg-opacity-50 flex items-end rounded-[36px] lg:px-14 md:px-10 sm:px-6 px-3 py-14 h-[509px]">
              <div className=" w-fit h-fit text-center">
                <span className=" block mt-auto text-slate-400">Image Copy & Download</span>
                <h1 className=" lg:text-3xl md:text-xl text-base my-4 ">Effortless Integration</h1>
                <p className=" text-slate-400">Copy screenshots to your design tools, with a focus on providing a convenient experience, while we work on our Figma plugin and mobile app for better accessibility.</p>
              </div>
            </div>

          </div>
        </div>
        {/* custoumer love corner */}
        {/* <div className=" flex flex-col mt-28 w-[90%] container mb-20">
          <h1 className=" lg:text-6xl text-3xl mb-6">Customer Love Corner</h1>
          <span className=" text-slate-300 mb-7 text-lg">We believe Dipzin should be accessible to all companies, no matter the size.</span>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-10">
              <TesmonialsCard tweet={
                <p className=" lg:text-3xl">
                  The scroll variant in <span className=" underline">@framer</span> hits differently.
                  <br />
                  <br />
                  Never imaged that making some complex things would be easy with that.
                </p>
              } />
              <TesmonialsCard tweet={
                <p className=" lg:text-3xl">
                  I was enjoying @framer a lot but I am BLOWN AWAY by their Figma plug-in. From Auto-layout to flex-box in the browser in seconds; this has completely changed how I'll build
                </p>
              } />
            </div>
            <div className="flex flex-col gap-10">
              <TesmonialsCard tweet={
                <p className=" lg:text-3xl">
                  Learned some basics of @framer yesterday, and today I delivered a landing page for a client.
                  <br />
                  <br />
                  It's so unreal how small the learning curve is from Figma to @framer.
                  <br />
                  <br />
                  Absolutely loving it.
                </p>
              } />

              <TesmonialsCard tweet={
                <p className=" lg:text-3xl">
                  Playing around with @framer while building a landing page for a side project. I suck at animations, but they make it so easy
                </p>
              } />
            </div>
          </div>
        </div> */}
      </main>
    </>
  );
};
export default Pricing


const TesmonialsCard = ({ tweet }) => {
  return <div className=" h-fit lg:pt-12 lg:pb-14 lg:px-12 p-6 bg-slate-800 bg-opacity-50 rounded-3xl">
    <div className=" flex justify-between items-center">
      <div className=" flex gap-6 items-center">
        <div className=" w-16 h-16 bg-white rounded-full">
        </div>
        <div className=" flex flex-col">
          <h4 className=" lg:text-3xl">Ahmed Mahmoud</h4>
          <span className=" lg:text-2xl">@ahmed</span>
        </div>
      </div>
      <Icons.FacebookIcon />
    </div>
    <div className=" mt-12">
      {tweet}
    </div>
  </div>
}




