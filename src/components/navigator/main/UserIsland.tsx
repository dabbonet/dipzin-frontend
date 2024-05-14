import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Avatar, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Tooltip, User, useDisclosure } from '@nextui-org/react';
import SparkleButton from '@/components/ui/SparkleButton';
import Icons from '@/components/Icons';
import { SignOut } from '@/lib/auth';
import { SettingsModal } from '@/components/SettingsModal';
import { usePagination, PaginationItemType } from "@nextui-org/react";
import { useResponsive } from '@/context/useResponsive';
import { Lock } from 'lucide-react';

const navigationItems = [
    { label: "Stream", href: "/ios" },
    { label: "Pricing", href: "/pricing" },
    { label: "Collections", href: "#", comingSoon: true },
    { label: "Blog", href: "#", comingSoon: true },
    { label: "Apps", href: "#", comingSoon: true },
    { label: "About", href: "#", comingSoon: true },
    { label: "Flows", href: "#", comingSoon: true },
    { label: "Support", href: "mailto:support@dipzin.com" },
    { label: "Screens", href: "#", comingSoon: true },
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
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    const prevActivePage = useRef(1); // Track previous active page
    const { isOpen, onOpen, onClose } = useDisclosure(); // State to control modal visibility
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const displayCount = isDesktop ? 4 : isTablet ? 2 : 1;
    const totalPages = Math.ceil(soonItems.length / displayCount);
    const { activePage, setPage } = usePagination({ total: totalPages });

    const displayedSoonItems = soonItems.slice((activePage - 1) * displayCount, activePage * displayCount);

    useEffect(() => {
        setIsUserPremium(user?.is_paid);
    }, [user]);

    const handleSettingsClick = () => {
        onOpen();
        setKey(prev => prev + 1); // Increment key to force re-render and close dropdown
    };

    const handlePageChange = (page) => {
        setDirection(page > prevActivePage.current ? 1 : -1);
        prevActivePage.current = page;
        setPage(page);
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
                    <Tooltip showArrow delay={300} className='font-semibold pt-0 bg-slate-800 text-aqua-500' content="coming soon">
                        <Button startContent={<Lock width={14} height={14} />} disabled variant='flat' radius='full' className='bg-transparent w-full h-fit py-2 text-slate-100' href='#'>
                            Collections
                        </Button>
                    </Tooltip>
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
                        <div className='w-fit h-fit flex items-center justify-between gap-2'>
                            <Button endContent={<Icons.Settings className="stroke-white w-[20px] h-[20px]" />} variant="light" onClick={handleSettingsClick} className='w-full h-fit flex items-center p-2 data-[hover=true]:bg-slate-800'>
                                <User
                                    className='w-fit h-fit p-0'
                                    name={user?.username}
                                    description={user?.email}
                                    avatarProps={{
                                        className: "w-[32px] h-[32px]",
                                        src: user?.avatar?.url,
                                        alt: user?.username,
                                    }}
                                />

                            </Button>
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
                            item.comingSoon ? (
                                <DropdownItem
                                    key={item?.label}
                                    classNames={{
                                        title: "font-semibold",
                                    }}
                                    className='w-full h-fit text-base text-white data-[hover=true]:bg-slate-800 py-1 px-2 data-[hover=true]:outline-0 data-[hover=true]:text-aqua-500'
                                    onClick={() => setKey(prev => prev + 1)}
                                    isReadOnly
                                >
                                    <Tooltip showArrow className='font-semibold py-0 bg-slate-800 text-aqua-500' content="Coming Soon">
                                        {item?.label}
                                    </Tooltip>
                                </DropdownItem>
                            ) : (
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
                            )
                        ))}
                    </DropdownSection>

                    <DropdownSection
                        classNames={{
                            group: "w-full h-full items-center",
                            heading: "text-slate-600 text-xs"
                        }}
                        title="Coming Soon"
                    >
                        <DropdownItem className='w-full h-full p-0 data-[hover=true]:outline-0' isReadOnly>
                            <AnimatePresence mode='wait' initial={false}>
                                <motion.div
                                    key={activePage}
                                    custom={direction}
                                    initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: direction < 0 ? 200 : -200, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{display: "flex"}}
                                    className='w-full h-full gap-2 grid grid-cols-2 justify-start items-center text-white'
                                >
                                    <div className='grid grid-cols-2 gap-3 overflow-hidden'>
                                        {displayedSoonItems.map(item => (
                                            <Button key={item.heading} className=' w-fit h-full bg-slate-900 data-[hover=true]:bg-slate-800 rounded-2xl p-4 flex flex-col gap-1 items-start text-start'>
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
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </DropdownItem>
                    </DropdownSection>
                    <DropdownItem isReadOnly className='w-full h-ft flex p-0 items-center justify-between'>
                        <div className="w-full h-fit flex items-center justify-between">
                            <div className="flex items-center gap-2.5 justify-center">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        className={`h-2.5 w-2.5 rounded-full ${activePage === page ? 'bg-slate-300' : 'bg-slate-800'}`}
                                        onClick={() => handlePageChange(page)}
                                    />
                                ))}
                            </div>
                            <div className='flex items-center gap-2'>
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
            className="flex w-fit h-fit items-center gap-1"
        >
            <Button variant='flat' disableRipple radius='full' className='bg-transparent w-full h-fit py-2 text-slate-100' href="/access">Create Account</Button>
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