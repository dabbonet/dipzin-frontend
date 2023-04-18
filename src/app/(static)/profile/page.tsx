import Icons from "@/components/Icons";
import Pills from "@/components/pricing/Pills";
import SubscribeType from "@/components/subscribeType";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className=" flex items-center flex-col">
      {/* BANNER */}
      <div className=" w-[90%] relative">
        <img
          src="/images/assets/backgroundProfile.svg"
          className=" w-full"
          alt=""
        />
      </div>
      {/* profile picture */}
      <div className=" flex w-[90%] justify-center items-center relative">
        <div className=" z-50">
          <img
            src="/images/assets/profilePage.svg"
            className="mx-auto lg:-mt-28 -mt-14 lg:w-48 lg:h-48 w-24 h-24"
            alt=""
          />
          <h1 className=" text-center text-slate-200 font-medium text-4xl">
            Dipzin Member
          </h1>
          <h4 className=" text-slate-400 text-xl text-center">@dipzinmember</h4>
        </div>
        <div className=" flex gap-x-2 absolute lg:right-0 -bottom-32 lg:bottom-0">
          <div className="bg-slate-800 rounded-xl p-3">
            <Icons.Heart className=" w-4 h-4 ml-auto" />
            <p className=" mr-5 mt-5">Edit</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-3">
            <Icons.Copy className=" w-4 h-4 ml-auto" />
            <p className=" mr-5 mt-5">Copy Link</p>
          </div>
        </div>
      </div>
      {/* form */}
      <div className=" w-[90%] mt-52">
        <div className=" bg-slate-900 rounded-3xl pt-7 px-8 pb-8">
          <h2 className=" font-normal text-xl">Account Informations</h2>
          <p className=" text-slate-300">
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
            <div className=" w-fit flex flex-wrap gap-x-14 justify-center gap-y-3 bg-slate-800 py-2 px-4 rounded-2xl">
              <Pills pillType="MONTHLY" />
              <Pills pillType="QUARTERLY" sale="35%" />
              <Pills pillType="ANNUALLY" sale="35%" />
            </div>
          </div>
          <div className=" flex flex-col gap-3 mt-11">
            <SubscribeType type="free" price={0} />
            <SubscribeType type="Subscription" price={6.99} />
          </div>
        </div>
      </div>
      {/* portfolio */}
      <div className=" w-[90%] mt-12">
        <div className=" bg-slate-900 rounded-3xl px-11 py-8">
          <h1 className=" text-xl font-normal">Portfolio projects</h1>
          <p className=" text-slate-300 font-normal text-xs">
            Share a few snippets of your work.
          </p>
          <div className=" mt-10 grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-6">
            <img
              src="/images/assets/imageProfile.svg"
              className=" mx-auto"
              alt=""
            />
            <img
              src="/images/assets/imageProfile.svg"
              className=" mx-auto"
              alt=""
            />
            <img
              src="/images/assets/imageProfile.svg"
              className=" mx-auto"
              alt=""
            />
            <img
              src="/images/assets/imageProfile.svg"
              className=" mx-auto"
              alt=""
            />
            <img
              src="/images/assets/imageProfile.svg"
              className=" mx-auto"
              alt=""
            />
            <img
              src="/images/assets/imageProfile.svg"
              className=" mx-auto"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
