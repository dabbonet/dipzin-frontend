import { getToken } from "@/lib/auth";
import { Button, Card, CardBody, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Icons from "./Icons";
import Image from "next/image";

type SettingsModalProps = {
    user: any,
    isOpen: boolean,
    onClose: () => void
}

export const SettingsModal = ({ user, isOpen, onClose }: SettingsModalProps) => {
    const { onOpenChange } = useDisclosure();

    const [userDetails, setUserDetails] = useState({
        name: '',
        username: "",
        email: "",
        country: "",
        bio: "",
        image: user?.avatar?.url,
        title: "",
        file: null
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
                if (response.ok) setUserDetails({ ...userDetails, ...data.data })
            } catch (error) {
                toast.remove()
                toast.error('error fetch data')
            }
        }
        getUserDetails();
    }, [])

    useEffect(() => {
        console.log(userDetails.username)
    }, [userDetails])

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
            console.log(src)
            const imageInput = document.createElement('input');
            imageInput.type = 'file';
            imageInput.accept = 'image/*';
            // imageInput.value = src
            const file = imageInput.files[0]
            console.log(file)
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
                        file: file,
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

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className=' bg-slate-900 p-5' size='4xl' isDismissable onClose={onClose} backdrop='blur'>
            <ModalContent>
                {(onClose) => {
                    const submitForm = async () => {
                        let formData = new FormData();
                        formData.append("auth", getToken());
                        formData.append("id", user.id);
                        formData.append("username", userDetails.username);
                        formData.append("name", userDetails.name);
                        formData.append("tilte", userDetails.title);
                        formData.append("bio", userDetails.bio);
                        formData.append("country", userDetails.country);
                        formData.append("email", userDetails.email);
                        if (userDetails.file) {
                            formData.append("file", userDetails.file);
                        }
                        console.log(formData)
                        const [updateResponse] = await Promise.all([
                            // TODO: add avatar to this body
                            fetch(`/api/account/update`, {
                                method: "POST",
                                body: formData
                            }),
                        ]);

                        if (updateResponse.ok) {
                            onClose()
                        }

                    };
                    return (
                        <>
                            <ModalHeader className="flex absolute top-4 left-4">
                                <div>
                                    <h1 className='text-md font-medium'>Account Informations</h1>
                                    <p className='text-sm font-medium text-slate-300'>Here you can view and edit your account information </p>
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <Tabs variant='bordered' className='rounded-2xl w-fit ml-auto border-slate-500' classNames={{ tabList: 'bg-transparent border-slate-500', cursor: 'dark:bg-slate-700 bg-slate-700' }}>
                                    <Tab
                                        className=' bg-transparent hover:bg-transparent' key='Account setup' title='Account setup'>
                                        <Card shadow='none' className=' bg-transparent hover:bg-transparent'>
                                            <CardBody className=' bg-transparent hover:bg-transparent drop-shadow-none p-0'>
                                                <form className="bg-slate-900 bg-opacity-50 mt-2 rounded-2xl w-full grid gap-4 md:grid-cols-2 grid-cols-1">
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
                                                        <label htmlFor="name" className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">
                                                            full name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            className="bg-slate-800/90 border border-transparent text-gray-900 text-sm rounded-lg block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
                                                            placeholder="ex:John"
                                                            required
                                                            value={userDetails.name}
                                                            name='name'
                                                            onChange={(e) => handleChange(e)}
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
                                                            onChange={(e) => handleChange(e)}
                                                            disabled={![null, ''].includes(userDetails.username)}
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
                                                            onChange={(e) => handleChange(e)}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label htmlFor="email" className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            className="bg-slate-800/90 border border-transparent text-gray-900 text-sm rounded-lg block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500"
                                                            placeholder="ex:jhonDoe@example.com"
                                                            required
                                                            value={userDetails.email}
                                                            name='email'
                                                            onChange={(e) => handleChange(e)}
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
                                                            onChange={(e) => handleChange(e)}
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
                                                            onChange={(e) => handleChange(e)}
                                                        />
                                                    </div>
                                                    <button className=" hidden" onClick={handlePost}></button>
                                                </form>
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                    <Tab className=' bg-transparent hover:bg-slate-700' key='Account setup 2' title='Membership Managment'>

                                    </Tab>
                                </Tabs>

                            </ModalBody>
                            <ModalFooter className=' flex justify-between'>
                                <Button variant="light" onClick={onClose} className='bg-transparent'>
                                    Need help?
                                </Button>
                                <Button className='text-aqua-950 bg-gradient-to-r from-aqua-400 to-aqua-600' onPress={submitForm} >
                                    Save Updates
                                </Button>
                            </ModalFooter>
                        </>
                    )
                }}
            </ModalContent>
        </Modal>
    );
}