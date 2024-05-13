import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Avatar, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, User, useDisclosure } from '@nextui-org/react';
import SparkleButton from '@/components/ui/SparkleButton';
import Icons from '@/components/Icons';
import { SignOut } from '@/lib/auth';
import { SettingsModal } from '@/components/SettingsModal';

const navigationItems = [
    { label: "Stream", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: "Collections", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Apps", href: "#" },
    { label: "About", href: "#" },
    { label: "Flows", href: "#" },
    { label: "Support", href: "mailto:support@dipzin.com" },
    { label: "Screens", href: "#" },
];

const UserIsland = ({ user }) => {
    const [isUserPremium, setIsUserPremium] = useState(false);
    const [key, setKey] = useState(0);  // State to force re-render
    const { isOpen, onOpen, onClose } = useDisclosure(); // State to control modal visibility


    useEffect(() => {
        setIsUserPremium(user?.is_paid);
    }, [user]);

    console.log(user);


    const handleSettingsClick = () => {
        onOpen();
        setKey(prev => prev + 1);  // Increment key to force re-render and close dropdown
    };

    const loggedInContent = (
        <motion.div
            layout
            key="loggedIn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full items-center justify-between"
        >
            {!isUserPremium ? (
                <SparkleButton href="/go-premium">
                    Go Premium
                </SparkleButton>
            ) : (
                <Button variant='light' onClick={() => alert('Logout')}>
                    Collections
                </Button>
            )}
            <Dropdown key={key} className='bg-[#050814] border-1 rounded-2xl p-6 border-[#1E293B]'>
                <DropdownTrigger className='cursor-pointer' aria-label="User Menu">
                    <span className='w-fit h-fit bg-slate-800 p-1 pr-2 rounded-full flex items-center justify-center gap-2'>
                        <Avatar className='w-8 h-8' alt={user?.username} color="primary" src={user?.avatar?.url} />
                        <Icons.BurgerMenu className='stroke-white' />
                    </span>
                </DropdownTrigger>
                <DropdownMenu classNames={{
                    list: "w-full h-full flex flex-col items-start gap-5",
                    base: "p-0 gap-0"
                }} aria-label="Static Actions">
                    <DropdownItem className='p-0' isReadOnly>
                        <div className='w-full h-fit flex items-center justify-between gap-2'>
                            <div className='w-full h-fit flex items-center gap-2.5'>
                                <User
                                    classNames={{
                                        description: "text-xs truncate overflow-hidden",
                                    }}
                                    name={user?.username}
                                    description={user?.email}
                                    avatarProps={{
                                        src: user?.avatar?.url,
                                        alt: user?.username,
                                    }}
                                />
                                <button onClick={handleSettingsClick} aria-label="Open Settings">
                                    <Icons.Settings className="stroke-white w-[20px] h-[20px]" />
                                </button>
                            </div>
                            <Button
                                className='w-fit h-fit p-1 text-[#F1F5F9]'
                                variant='light'
                                href='/settings'
                                onClick={SignOut}
                                startContent={<Icons.LogOut className="stroke-[#F1F5F9]" />}
                            >
                                Logout
                            </Button>
                        </div>
                    </DropdownItem>
                    <DropdownSection
                        classNames={{
                            group: "w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-3",
                        }}
                        title="Navigation"
                    >
                        {navigationItems.map(item => (
                            <DropdownItem
                                key={item?.label}
                                classNames={{
                                    title: "font-semibold",
                                }}
                                className='w-full h-fit text-white data-[hover=true]:bg-slate-800 py-1 px-2 data-[hover=true]:outline-none data-[hover=true]:text-aqua-500'
                                href={item?.href}
                                onClick={() => setKey(prev => prev + 1)}
                            >
                                {item?.label}
                            </DropdownItem>
                        ))}
                    </DropdownSection>
                    <DropdownSection
                        title="Coming Soon"
                    >
                        <DropdownItem isReadOnly className='w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-3'>
                            {/* <Button className='w-fit h-full bg-slate-900 rounded-2xl p-4 flex flex-col gap-1 items-start'>
                                <h1>Mobile Application</h1>
                                <p>Work from your browser with our lightweight extension.</p>
                                <Chip className='w-fit h-fit rounded-[3px] px-[0.5px] py-[0.3px] bg-[#FCEED9] text-[#383B3D] text-[8px]'>
                                    Soon
                                </Chip>
                            </Button> */}
                        </DropdownItem>

                    </DropdownSection>

                </DropdownMenu>
            </Dropdown>

            {/* Settings Modal */}
            <SettingsModal user={user} isOpen={isOpen} onClose={onClose} />
        </motion.div>
    );

    const loggedOutContent = (
        <motion.div
            layout
            key="loggedOut"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between p-4"
        >
            <Link href="/create-account">Create Account</Link>
            <SparkleButton href="/login">Login</SparkleButton>
        </motion.div>
    );

    return (
        <AnimatePresence>
            {user ? loggedInContent : loggedOutContent}
        </AnimatePresence>
    );
};

export default UserIsland;
