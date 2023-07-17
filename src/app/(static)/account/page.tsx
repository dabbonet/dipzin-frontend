'use client'

import { ActionBar, SquareButton } from "@/components/ActionBar";
import Icons from "@/components/Icons";
import Card from "@/components/pricing/Card";
import Pills from "@/components/pricing/Pills";
import { getToken } from "@/lib/auth";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";



const Account: FC = ({}) => {
  const searchParams = useSearchParams()
  const buttonRef = useRef(null)
  const firstTime = searchParams.get('firstTime')
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    userName: "",
    email: "",
    country: "",
    bio: "",
    image: null,
    title: "",
  })
  // get user details to display it
  useEffect(() => {
    async function getUserDetails() { 
      try {
        const response = await fetch("example", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
          },
        });
        const data = await response.json();
        setUserDetails(data)
      } catch (error) {
        console.log(error);
      }
    }
    getUserDetails();
  }, [])
  // change user details
  const handleChange = (event) => {
    const { name, value , files } = event.target
    if (name === "image") {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result)
        setUserDetails({
          ...userDetails,
          [name]: e.target.result
        })
      }
      reader.readAsDataURL(files[0]!);
    } else {
      setUserDetails({
        ...userDetails,
          [name]: value
        })
    }
    
  }
  const handleClick = () => { 
    buttonRef.current.click();
  }
  // post request to save it 
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("example", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails)
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  const FirstTimeHeader = () => {
    if (firstTime) {
      return <div className="w-[90%]">
        <h1 className=" lg:text-8xl md:text-4xl text-3xl">
          Welcome to dipzin,
        </h1>
        <p className=" text-sm">
          Dipzin is a web application aimed for UI/UX designers and product
          managers.
        </p>
      </div>
    }
  }
  const UserNameInput = () => {
  
    return <input
      type="text"
      id="user_name"
      className="bg-slate-100 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
      placeholder="ex:@jhonDoe"
      required
      value={userDetails.userName}
      name='userName'
      onChange={(e)=> handleChange(e)}
  />
  }
  return (
    <div className="max-w-7xl mx-auto tracking-wide">
      {/* Welcome Area */}
      <FirstTimeHeader/>

      {/* Head Area */}
      <div className="flex justify-between mt-12 items-center flex-wrap gap-y-3">
        <div className="flex items-center space-x-8 flex-wrap gap-y-3">
          <div className="bg-slate-700 w-28 h-28 rounded-2xl mx-auto md:mx-0 overflow-hidden">
            <label htmlFor="image" className=" w-full h-full cursor-pointer flex justify-center items-center">
              {userDetails.image ? <img src={userDetails.image} className='w-full h-full' alt="" /> : '📷'}
            </label>
            <input type="file" accept="image/*" className=" hidden" id="image" name="image"
              onChange={(e)=> handleChange(e)}
            />
          </div>
          <div>
            <h2 className="text-4xl text-center md:text-left">{firstTime ? 'Account Informations' :"Dipzin Member"}</h2>
            <p className="font-extralight tracking-wide text-slate-300 text-center md:text-left">
              {firstTime ? "Here you can view and edit your account information" : '@dipzinmember'}
            </p>
          </div>
        </div>
        <ActionBar className="h-fit mx-auto md:mx-0" onClick={handleClick}>
          <SquareButton className="w-32">
            <SquareButton.Title className="w-[70%]">save</SquareButton.Title>
            <SquareButton.Icon>
              <Icons.Heart />
            </SquareButton.Icon>
          </SquareButton>
        </ActionBar>
      </div>

      {/* Account Details Area */}
      <form className="bg-slate-900 bg-opacity-50 mt-8 rounded-2xl w-full grid gap-4 px-8 py-8 md:grid-cols-2 grid-cols-1">
        <div className="">
          <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">
            First name
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-slate-100 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
            placeholder="ex:John"
            required
            value={userDetails.firstName}
            name='firstName'
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div className="">
          <label htmlFor="user_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">
            Username
          </label>
          <UserNameInput/>
        </div>
        <div className="">
          <label htmlFor="bio" className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">
            Bio
          </label>
          <input
            type="text"
            id="bio"
            className="bg-slate-100 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
            placeholder="ex:lorempixel"
            value={userDetails.bio}
            name='bio'
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div className="">
          <label htmlFor="email_adress" className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">
            Email Address
          </label>
          <input
            type="email"
            id="email_adress"
            className="bg-slate-100 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
            placeholder="ex:jhonDoe@example.com"
            required
            value={userDetails.email}
            name='email'
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div className="">
          <label htmlFor="title" className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-slate-100 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
            placeholder="ex:the great title"
            required
            value={userDetails.title}
            name='title'
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div className="">
          <label htmlFor="country" className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">
            Country
          </label>
          <input
            type="text"
            id="country"
            className="bg-slate-100 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
            placeholder="ex:USA"
            required
            value={userDetails.country}
            name='country'
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <button className=" hidden" ref={buttonRef} onClick={(e)=>handlePost}></button>
      </form>

      {/* Account Details Area */}

      <div className="bg-slate-900 bg-opacity-50 mt-8 rounded-2xl w-full px-8 py-8 min-h-[600px]">
        {/* <div className=" bg-slate-900 pt-6 px-8 pb-10 rounded-3xl"> */}
          <div className=" flex flex-wrap justify-between items-center gap-y-3">
            <h4 className=" text-xl font-normal mx-auto md:mx-0">{firstTime ? 'Select a Plan' : "Membership"}</h4>
            <div className=" w-fit flex flex-wrap justify-center items-center gap-3 bg-slate-800 py-2 px-4 rounded-full">
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
      {/* </div> */}
    </div>
  );
};

export default dynamic(()=> Promise.resolve(Account), {ssr:false});
