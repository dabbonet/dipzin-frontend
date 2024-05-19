'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import Link from 'next/link';
import { Avatar, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Tooltip, User, useDisclosure } from '@nextui-org/react';
import SparkleButton from '@/components/ui/SparkleButton';
import Icons from '@/components/Icons';
import { SignOut } from '@/lib/auth';
import { SettingsModal } from '@/components/SettingsModal';
import { usePagination } from "@nextui-org/react";
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
    { heading: 'Marketing Pages', description: "Showcases your brand's<br/> offerings effectively.", badge: 'Q2 2024' },
    { heading: 'Arabic Marketing Pages', description: 'Easily collect your Arabic<br/> marketing pages.', badge: 'Q2 2024' },
    { heading: 'Collections', description: 'Create, share, comment, and<br/> save in your collection library.', badge: 'Q3 2024' },
    { heading: 'Flows', description: 'See the flow screens of web<br/> and apps.', badge: 'Q3 2024' },
    { heading: 'Interactive Prototypes', description: 'Interact with prototype<br/> screens all in one place.', badge: 'Q3 2024' },
    { heading: 'Journey Interactions', description: 'View Flow Interactions,<br/> Gestures and Collect it.', badge: 'Q3 2024' },
    { heading: 'Figma Plugin', description: 'Easily download screens with<br/> Figma Plugin.', badge: 'Q4 2024' },
    { heading: 'Mobile Apps', description: 'Available for download as a<br/> mobile app.', badge: 'Q4 2024' },
    { heading: '+1000 Apps', description: 'Over 1000 apps available in<br/> one place.', badge: 'Q4 2024' },
    { heading: 'Comments', description: 'Leave comments in your<br/> collection.', badge: 'Q4 2024' },
];

type UserIslandProps = {
    user: {
        is_paid: boolean;
        username: string;
        email: string;
        avatar: {
            url: string;
        };
    };
};

const UserIsland: React.FC<UserIslandProps> = ({ user }) => {
    const [isUserPremium, setIsUserPremium] = useState(false);
    const [key, setKey] = useState(0);  // State to force re-render
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    const prevActivePage = useRef(0); // Track previous active page
    const { isOpen, onOpen, onClose } = useDisclosure(); // State to control settings modal visibility
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

    const handlePageChange = (page: number) => {
        setDirection(page > prevActivePage.current ? 1 : -1);
        prevActivePage.current = page;
        setPage(page);
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset < -100 || velocity < -500) {
            if (activePage < totalPages) {
                handlePageChange(activePage + 1);
            }
        } else if (offset > 100 || velocity > 500) {
            if (activePage > 1) {
                handlePageChange(activePage - 1);
            }
        }
    };

    const handleWheel = (event: WheelEvent) => {
        if (event.shiftKey) {
            if (event.deltaY < 0 && activePage > 1) {
                handlePageChange(activePage - 1);
            } else if (event.deltaY > 0 && activePage < totalPages) {
                handlePageChange(activePage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("wheel", handleWheel as EventListener);
        return () => {
            window.removeEventListener("wheel", handleWheel as EventListener);
        };
    }, [activePage]);

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
                <DropdownMenu
                    classNames={{
                        list: "w-full h-full flex flex-col items-start gap-5",
                        base: "p-0 gap-0"
                    }}
                    aria-label="Static Actions">
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
                                className='w-fit h-fit p-1 text-[#F1F5F9] data-[hover=true]:bg-slate-800'
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
                                    className='w-full h-fit text-base font-semibold text-white data-[hover=true]:bg-slate-800 py-1 px-2 data-[hover=true]:outline-0 data-[hover=true]:text-aqua-500'
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
                                    className='w-full h-fit text-base font-semibold text-white data-[hover=true]:bg-slate-800 py-1 px-2 data-[hover=true]:outline-0 data-[hover=true]:text-aqua-500'
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
                        <DropdownItem className='w-full h-full p-0 data-[hover=true]:outline-0 hover:cursor-default' isReadOnly>
                            <AnimatePresence mode='wait' initial={false}>
                                <motion.div
                                    key={activePage}
                                    custom={direction}
                                    initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: direction < 0 ? 200 : -200, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ display: "flex" }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={handleDragEnd}
                                >
                                    <div className='w-full h-full grid grid-cols-2 gap-3 overflow-x-auto overflow-hidden'>
                                        {displayedSoonItems.map(item => (
                                            <Button disableRipple key={item.heading} className='w-full flex-1 h-full bg-slate-900 data-[hover=true]:bg-slate-800 rounded-2xl p-4 flex flex-col gap-1 items-start text-start'>
                                                <h1 className='text-[12px] leading-normal font-medium text-white' >{item.heading}</h1>
                                                <p className='text-[11px] leading-normal font-normal text-slate-400' dangerouslySetInnerHTML={{ __html: item.description }} />
                                                {item.badge === 'Q2 2024' ? (
                                                    <Chip classNames={{
                                                        content: "w-fit h-fit px-1"
                                                    }} className='w-fit h-fit rounded-[3px] bg-lime-100 text-lime-900 text-[11px]'>
                                                        {item.badge}
                                                    </Chip>
                                                ) : (
                                                    <Chip classNames={{
                                                        content: "w-fit h-fit px-1"
                                                    }} className='w-fit h-fit rounded-[3px] px-[0.5px] py-[0.3px] bg-[#FCEED9] text-[#383B3D] text-[9px]'>
                                                        {item.badge}
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
                                <Link href="/copyrights" className='text-slate-500 hover:text-aqua-500 transition-all font-medium text-[10px]'>Copyrights</Link>
                                <Link href="/terms" className='text-slate-500 hover:text-aqua-500 transition-all font-medium text-[10px]'>Terms of Service</Link>
                                <Link href="/privacy" className='text-slate-500 hover:text-aqua-500 transition-all font-medium text-[10px]'>Privacy</Link>
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
