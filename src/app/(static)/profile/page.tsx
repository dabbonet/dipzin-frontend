"use client";
import Icons from "@/components/Icons";
import Card from "@/components/pricing/Card";
import Pills from "@/components/pricing/Pills";
import { useRouter } from "next/router";
import React from "react";

const page = () => {
  let firstTime;
  return (
    <div className=" flex items-center flex-col">
      {/* first time */}
      {firstTime ? (
        <div className="w-[90%]">
          <h1 className=" lg:text-8xl md:text-4xl text-3xl">Welcome to dipzin,</h1>
          <p className=" text-sm">
            Dipzin is a web application aimed for UI/UX designers and product
            managers.
          </p>
          <div className=" flex justify-between items-center mt-28">
            <div className=" flex items-center gap-8 flex-wrap">
              <img
                src="/images/assets/profilePage"
                className=" w-28 h-28"
                alt=""
              />
              <div className="">
                <h1 className=" text-slate-200 text-4xl">Account Informations</h1>
                <p className=" text-slate-400">Here you can view and edit your account information </p>
              </div>
            </div>
            <div className=" bg-slate-900 border-white border-solid border-opacity-20 p-2 rounded-2xl">
              <div className=" bg-slate-800 rounded-xl p-3">
                <Icons.Heart className=" w-4 h-4 ml-auto" />
                <span className=" mr-3 mt-4">Save</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-[90%]">
          <div className=" flex justify-between items-center">
            <div className=" flex items-center gap-8 flex-wrap">
              <img
                src="/images/assets/profilePage"
                className=" w-28 h-28"
                alt=""
              />
              <div className="">
                <h1 className=" text-slate-200 text-4xl">Dipzin Member</h1>
                <p className=" text-slate-400">@dipzinmember</p>
              </div>
            </div>
            <div className=" bg-slate-900 border-white border-solid border-opacity-20 p-2 rounded-2xl">
              <div className=" bg-slate-800 rounded-xl p-3">
                <Icons.Heart className=" w-4 h-4 ml-auto" />
                <span className=" mr-3 mt-4">Save</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* profile picture */}

      {/* form */}
      <div className=" w-[90%] mt-9">
        <div className=" bg-slate-900 rounded-3xl pt-7 px-8 pb-8">
          <h2 className=" font-normal text-xl">Account Informations</h2>
          <p className=" text-slate-300 mt-3">
            Here you can view and edit your account Informations
          </p>
          <form
            action=""
            className=" mt-6 grid md:grid-cols-2 grid-cols-1 gap-11"
          >
            <div className=" flex flex-col gap-2">
              <label
                htmlFor="full-name"
                className=" text-slate-400 text-base font-normal"
              >
                Full Name
              </label>
              <input
                type="text"
                name=""
                id="full-name"
                className=" rounded-xl py-5 px-8 bg-slate-800"
              />
            </div>
            <div className=" flex flex-col gap-2">
              <label
                htmlFor="full-name"
                className=" text-slate-400 text-base font-normal"
              >
                Username
              </label>
              <input
                type="text"
                name=""
                id="full-name"
                className=" rounded-xl py-5 px-8 bg-slate-800"
              />
            </div>
            <div className=" flex flex-col gap-2">
              <label
                htmlFor="full-name"
                className=" text-slate-400 text-base font-normal"
              >
                Email Address
              </label>
              <input
                type="text"
                name=""
                id="full-name"
                className=" rounded-xl py-5 px-8 bg-slate-800"
              />
            </div>
            <div className=" flex flex-col gap-2">
              <label
                htmlFor="full-name"
                className=" text-slate-400 text-base font-normal"
              >
                Role
              </label>
              <input
                type="text"
                name=""
                id="full-name"
                className=" rounded-xl py-5 px-8 bg-slate-800"
              />
            </div>
            <div className=" flex flex-col gap-2">
              <label
                htmlFor="full-name"
                className=" text-slate-400 text-base font-normal"
              >
                Bio
              </label>
              <input
                type="text"
                name=""
                id="full-name"
                className=" rounded-xl py-5 px-8 bg-slate-800"
              />
            </div>
            <div className=" flex flex-col gap-2">
              <label
                htmlFor="full-name"
                className=" text-slate-400 text-base font-normal"
              >
                Country
              </label>
              <input
                type="text"
                name=""
                id="full-name"
                className=" rounded-xl py-5 px-8 bg-slate-800"
              />
            </div>
          </form>
        </div>
      </div>
      {/* membership */}
      <div className=" w-[90%] mt-12">
        <div className=" bg-slate-900 pt-6 px-8 pb-10 rounded-3xl">
          <div className=" flex flex-wrap justify-between items-center gap-y-3">
            <h4 className=" text-xl font-normal">Membership</h4>
            <div className=" w-fit flex flex-wrap gap-x-14 justify-center gap-y-3 bg-slate-800 py-2 px-4 rounded-full">
              <Pills pillType="MONTHLY" />
              <Pills pillType="QUARTERLY" sale="35%" />
              <Pills pillType="ANNUALLY" sale="35%" />
            </div>
          </div>
          <div className=" grid lg:grid-cols-3 gap-3 md:grid-cols-2 grid-cols-1">
            <Card
              subscribeName="Free"
              price={0}
              features={[
                "Download & Copy PNGs",
                "3 Collections",
                "Limited Search & Filters",
              ]}
              price_per="Monthly"
            />
            <Card
              subscribeName="Personal"
              price={6.99}
              features={[
                "Download in bulk",
                "Select and Copy",
                "Unlimited Collections",
                "Unlimited Search & Filters",
              ]}
              price_per="Quarterly"
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
