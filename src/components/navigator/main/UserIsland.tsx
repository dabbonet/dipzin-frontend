import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Avatar, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, User, useDisclosure } from '@nextui-org/react';
import SparkleButton from '@/components/ui/SparkleButton';
import Icons from '@/components/Icons';
import { SignOut } from '@/lib/auth';
import { SettingsModal } from '@/components/SettingsModal';
import { usePagination, PaginationItemType } from "@nextui-org/react";
import { useResponsive } from '@/context/useResponsive';

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

const soonItems = [
    { heading: 'Figma Plugin', description: 'Work from your browser with<br/> our lightweight extension.', badge: 'in progress' },
    { heading: 'Mobile Application', description: 'Work from your browser with<br/> our lightweight extension.', badge: 'soon' },
    { heading: 'Flows', description: 'Work from your browser with<br/> our lightweight extension.', badge: 'soon' },
    { heading: 'Automatic enrichment', description: 'Work from your browser with<br/> our lightweight extension.', badge: 'soon' },
    { heading: 'test test', description: 'Work from your browser with<br/> our lightweight extension.', badge: 'in progress' },
    { heading: 'Mobile Application', description: 'Work from your browser with<br/> our lightweight extension.', badge: 'soon' },
    { heading: 'Flows', description: 'Work from your browser with<br/> our lightweight extension.', badge: 'soon' },
    { heading: 'Automatic enrichment', description: 'Work from your browser with<br/> our lightweight extension.', badge: 'soon' },
    { heading: 'test test2', description: 'Work from your browser with<br/> our lightweight extension.', badge: 'in progress' },
    { heading: 'Mobile Application', description: 'Work from your browser with<br/> our lightweight extension.', badge: 'soon' },
    { heading: 'Flows', description: 'Work from your browser with<br/> our lightweight extension.', badge: 'soon' },
    { heading: 'Automatic enrichment', description: 'Work from your browser with<br/> our lightweight extension.', badge: 'soon' },
];

const UserIsland = ({ user }) => {
    const [isUserPremium, setIsUserPremium] = useState(false);
    const [key, setKey] = useState(0);  // State to force re-render
    const { isOpen, onOpen, onClose } = useDisclosure(); // State to control modal visibility
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const displayCount = isDesktop ? 4 : isTablet ? 2 : 1;
    const totalItems = soonItems.length;
    const totalPages = Math.ceil(totalItems / displayCount);

    const { activePage, range, setPage } = usePagination({ total: totalPages });

    const displayedSoonItems = soonItems.slice((activePage - 1) * displayCount, activePage * displayCount);

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
            className="flex h-full gap-2 w-fit items-center justify-between"
        >
            {!isMobile &&
                (!isUserPremium ? (
                    <SparkleButton href="/pricing">
                        Go Premium
                    </SparkleButton>
                ) : (
                    <Button variant='light' radius='full' className='text-slate-100' href='#'>
                        Collections
                    </Button>
                ))
            }

            <Dropdown placement='bottom-end' key={key} className='bg-[#050814] border-1 rounded-2xl p-6 border-[#1E293B]'>
                <DropdownTrigger className='cursor-pointer' aria-label="User Menu">
                    <span className='w-fit h-full bg-slate-800 p-1 pr-2 m-0 rounded-full flex items-center justify-center gap-2'>
                        <Avatar className='w-8 h-8' alt={user?.username} src={user?.avatar?.url} />
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
                                        name: "text-sm text-white",
                                        description: "text-xs truncate overflow-hidden",
                                    }}
                                    name={user?.username}
                                    description={user?.email}
                                    avatarProps={{
                                        className: "w-[32px] h-[32px]",
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
                            group: "w-full h-fit grid grid-cols-3 2xl:grid-cols-2 gap-3",
                            heading: "text-slate-600 text-xs"
                        }}
                        title="Navigation"
                    >
                        {navigationItems.map(item => (
                            <DropdownItem
                                key={item?.label}
                                classNames={{
                                    title: "font-semibold",
                                }}
                                className='w-full h-fit text-base text-white data-[hover=true]:bg-slate-800 py-1 px-2 data-[hover=true]:outline-0 data-[hover=true]:text-aqua-500'
                                href={item?.href}
                                onClick={() => setKey(prev => prev + 1)}
                            >
                                {item?.label}
                            </DropdownItem>
                        ))}
                    </DropdownSection>

                    <DropdownSection
                        classNames={{
                            group: "w-full h-full items-center grid grid-cols-2 gap-3 overflow-auto scrollbar-hide max-w-[400px]",
                            heading: "text-slate-600 text-xs"
                        }}
                        title="Coming Soon"
                    >
                        {displayedSoonItems.map(item => (
                            <DropdownItem className='w-full h-full p-0 data-[hover=true]:outline-0' isReadOnly key={item.heading}>
                                <Button className=' w-fit h-full bg-slate-900 data-[hover=true]:bg-slate-800 rounded-2xl p-4 flex flex-col gap-1 items-start text-start'>
                                    <h1 className='text-[10px] leading-normal font-medium text-white'>{item.heading}</h1>
                                    <p className='text-[10px] leading-normal font-normal text-slate-400' dangerouslySetInnerHTML={{ __html: item.description }} />
                                    {item.badge === "soon" ? (
                                        <Chip classNames={{
                                            content: "w-fit h-fit px-1"
                                        }} className='w-fit h-fit rounded-[3px] px-[0.5px] py-[0.3px] bg-[#FCEED9] text-[#383B3D] text-[9px]'>
                                            Soon
                                        </Chip>
                                    ) : (
                                        <Chip classNames={{
                                            content: "w-fit h-fit px-1"
                                        }} className='w-fit h-fit rounded-[3px] bg-lime-100 text-lime-900 text-[9px]'>
                                            In Progress
                                        </Chip>
                                    )}
                                </Button>
                            </DropdownItem>
                        ))}
                    </DropdownSection>
                    <DropdownItem isReadOnly className='w-full h-ft flex p-0 items-center justify-between'>
                        <div className='w-full h-fit flex p-0 items-center justify-between'>
                            <div className="w-fit h-fit flex items-center gap-2.5 justify-center">
                                {range.map(page => (
                                    <button key={page} className={`h-2.5 w-2.5 rounded-full ${activePage === page ? 'bg-slate-300' : 'bg-slate-800'}`} onClick={() => setPage(Number(page))} />
                                ))}
                            </div>
                            <div className='w-fit h-fit flex items-center gap-2'>
                                <Link href="/copyrights" className='text-slate-500 font-medium text-[10px]'>Copyrights</Link>
                                <Link href="/terms" className='text-slate-500 font-medium text-[10px]'>Terms of Service</Link>
                                <Link href="/privacy" className='text-slate-500 font-medium text-[10px]'>Privacy</Link>
                            </div>
                        </div>
                    </DropdownItem>
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
            className="flex items-center gap-1"
        >
            <Button variant='light' radius='full' className='text-slate-100' href="/access">Create Account</Button>
            <SparkleButton href="/access">Login</SparkleButton>
        </motion.div>
    );

    return (
        <AnimatePresence>
            {user ? loggedInContent : loggedOutContent}
        </AnimatePresence>
    );
};

export default UserIsland;