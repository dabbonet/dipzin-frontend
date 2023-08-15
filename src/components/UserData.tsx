'use client'
import { SignOut, getToken, useAuth } from '@/lib/auth'
import { AnimatePresence , motion} from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Menu from './navigator/main/menu'
import Icons from './Icons'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, User, useDisclosure } from '@nextui-org/react'
import { toast } from 'react-hot-toast'

const UserData = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {user} = useAuth()
    const [userDetails, setUserDetails] = useState({
      name: '',
      username: "",
      email: "",
      country: "",
      bio: "",
      image: null,
      title: "",
    })
    useEffect(() => {
      async function getUserDetails() { 
        try {
          const response = await fetch("/api/account/info", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              auth: getToken()
            })
          });
          const data = await response.json();
          if(response.ok) setUserDetails(data.data)
        } catch (error) {
          toast.remove()
          toast.error('error fetch data')
        }
      }
      getUserDetails();
    }, [])
    const [show, setShow] = useState(false)
    function useOutsideAlerter(ref: any) {
      useEffect(() => {
          function handleClickOutside(event: any) {
              if (ref.current && !ref.current.contains(event.target)) {
                  setShow(false)
              }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              // Unbind the event listener on clean up
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [ref]);
  }
  useEffect(() => {
    return () => {
      setShow(false)
    }
  }, [])
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
    }
  }
  
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const handleChange = (event) => {
    const { id, value, files, src } = event.target
    if (id === 'image') {
        setUserDetails({
            ...userDetails,
            image: src
        })
        return
    }
    if (id === 'label') {
        const file = files[0]
        const reader = new FileReader();
        if (file) {
            reader.onloadend = () => {
                const imageDataUrl = reader.result;
                setUserDetails({
                    ...userDetails,
                    image: imageDataUrl
                })
            };
            reader.readAsDataURL(file);
        }
        
    }
    setUserDetails({
        ...userDetails,
        [id]: value
    })
}
const submitForm = async (e) => {
  e.preventDefault();
  try {
      const [updateResponse, newsLetterResponse] = await Promise.all([
          fetch(`/api/account/update`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  auth: getToken(),
                  username: userDetails.username,
                  name: userDetails.name,
              }),
          }),
          fetch('/api/user-system-news-letters', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  data: {
                      news_letters: userArr,
                      auth: getToken()
                  },
              }),
          }),
      ]);
      
  } catch (error) {
      toast.remove();
      toast.error('Something went wrong');
  }
};
  return (
    user && <div className=' flex flex-col relative gap-y-1' ref={wrapperRef}>
        <AnimatePresence mode='wait'>
          {show && <Menu/>}
        </AnimatePresence>
      <Popover placement="top">
        <PopoverTrigger>
        <User   
          name={user?.name}
          description={user?.username}
          avatarProps={{
            src: user?.avatar.url
          }}
        />
        </PopoverTrigger>
        <PopoverContent className=' flex flex-col gap-3 bg-slate-900 p-4'>
          <button onClick={onOpen} className=' flex gap-1 w-full bg-transparent hover:bg-slate-700 px-3 py-2 rounded-lg text-slate-50 items-center'>
            <Icons.Account/>
            <span>Account Settings</span>
          </button>
          <button className=' flex gap-1 w-full bg-transparent hover:bg-slate-700 px-3 py-2 rounded-lg text-slate-50 items-center' onClick={SignOut}>
            <Icons.LogOut/>
            <span>Logout</span>
          </button>
        </PopoverContent>
      </Popover>
        
        <motion.div
          className="flex items-center bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-3xl w-fit py-3 px-6"
          onClick={() => {
              setShow(!show)
          }}>
          <Icons.Grip className='w-4 h-4 text-slate-400' />
          <span className="font-medium text-sm">Menu</span>
        </motion.div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className=' bg-slate-900' size='4xl' isDismissable={false} backdrop='blur'>
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="flex justify-between">
                  <div>
                    <h1>Account Informations</h1>
                    <p>Here you can view and edit your account information </p>
                  </div>
                  <div className=' p-1 rounded-md border border-solid border-slate-500 flex items-center'>
                    <Button className=' bg-transparent hover:bg-slate-700'>Account Settings</Button>
                    <Button className=' bg-transparent hover:bg-slate-700'>Account Settings</Button>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <form className="bg-slate-900 bg-opacity-50 mt-8 rounded-2xl w-full grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div className=" mb-5">
                    <p className=" text-slate-300 text-base font-normal">Profile Picture</p>
                    <div className=" grid grid-cols-6 gap-x-2">
                        <img src="/images/assets/manager.png" id='image' onClick={handleChange} className=" cursor-pointer" />
                        <img src="/images/assets/manager2.png" id='image' onClick={handleChange} className=" cursor-pointer" />
                        <img src="/images/assets/manager3.png" id='image' onClick={handleChange} className=" cursor-pointer" />
                        <img src="/images/assets/manager4.png" id='image' onClick={handleChange} className=" cursor-pointer" />
                        <img src="/images/assets/manager5.png" id='image' onClick={handleChange} className=" cursor-pointer" />
                        <img src="/images/assets/manager6.png" id='image' onClick={handleChange} className=" cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4 mb-4">
                        <div className=" bg-slate-800 p-1 h-fit border border-dotted border-slate-600 rounded-2xl">
                            <div className="bg-slate-700 w-14 h-14 rounded-xl mx-auto md:mx-0 overflow-hidden">
                                <label htmlFor="label" className=" w-full h-full cursor-pointer flex justify-center items-center relative z-50">
                                    {userDetails.image ? <img src={userDetails.image} className='w-full h-full object-cover' id="image" /> : <Icons.addImage className="absolute bottom-2 right-2" />}
                                </label>
                                <input type="file" accept="image/*" className=" hidden" id="label"
                                    onChange={handleChange}
                                    onClick={(e) => {
                                        let { files }: any = e.target
                                        files = {}
                                        console.log(files)
                                    }}
                                />
                            </div>

                        </div>
                        <div className='flex flex-col justify-center'>
                            <p className=' text-sm text-white'>Upload a Profile Picture</p>
                            <p className=' text-slate-600 text-sm'>Supported formats: jpg, png maximum size: 2MB</p>
                        </div>
                    </div>
                    <div className="">
                      <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">
                        full name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="bg-slate-800/90 border border-transparent text-gray-900 text-sm rounded-lg block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        placeholder="ex:John"
                        required
                        value={userDetails.name}
                        name='name'
                        onChange={(e)=> handleChange(e)}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="user_name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">
                        Username
                      </label>
                      <input
                          type="text"
                          id="user_name"
                          className="bg-slate-800/90 border border-transparent text-gray-900 text-sm rounded-lg block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
                          placeholder="ex:@jhonDoe"
                          required
                          value={userDetails.username}
                          name='username'
                          onChange={(e)=> handleChange(e)}
                          disabled={userDetails.username !== ''}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="bio" className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">
                        Bio
                      </label>
                      <input
                        type="text"
                        id="bio"
                        className="bg-slate-800/90 border border-transparent text-gray-900 text-sm rounded-lg block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
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
                        className="bg-slate-800/90 border border-transparent text-gray-900 text-sm rounded-lg block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
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
                        className="bg-slate-800/90 border border-transparent text-gray-900 text-sm rounded-lg block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
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
                        className="bg-slate-800/90 border border-transparent text-gray-900 text-sm rounded-lg block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        placeholder="ex:USA"
                        required
                        value={userDetails.country}
                        name='country'
                        onChange={(e)=> handleChange(e)}
                      />
                    </div>
                    <button className=" hidden"  onClick={(e)=>handlePost}></button>
                  </form>
                </ModalBody>
                <ModalFooter className=' flex justify-between'>
                  <Button variant="light" onClick={onClose} className='bg-transparent'>
                    Need help?
                  </Button>
                  <Button onPress={onClose} className='text-aqua-950 bg-gradient-to-r from-aqua-400 to-aqua-600'>
                    Save Updates
                  </Button>
                </ModalFooter>
              </>
            )
          }}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UserData