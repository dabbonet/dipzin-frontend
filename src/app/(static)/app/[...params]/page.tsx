"use client"
import { motion } from 'framer-motion';
import { FC } from 'react'

const page: FC = ({ params }: any) => {
    const platform = params[0]
    const slug = params[1]
    return (
        <main className="w-full flex flex-col items-center">
            <div className="flex w-[100%] h-[25%] mt-[100px] mb-[65px] items-center text-white z-10">
                <img
                    className="h-[40%] w-[4.8%] ml-[13%] rounded-2xl bg-slate-500"
                    src={'te'}
                />
                <div className="ml-12">
                    <span className="text-[32px] font-medium">Name</span>
                    <span className="block text-[16px] text-[#8F94A1]">
                        Tagline
                    </span>
                </div>

                <div className="ml-auto flex flex-col text-right">
                    <span className="text-[20px] font-medium">
                        Categories
                    </span>
                    <span className="block text-[16px] text-[#8F94A1]">
                        App Category
                    </span>
                </div>
                <div className="ml-[100px] mr-[13%] flex flex-col text-right">
                    <span className="text-[20px] font-medium">copyrights</span>
                    <span className="block text-[16px] text-[#8F94A1]">@copyright</span>
                </div>
            </div>

            <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-6 lg:gap-5 gap-5 mb-10 grid-cols-2">
                <div
                    className="flex justify-center items-center relative group/item"
                >
                    <motion.div
                        layout
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.3 },
                        }}
                    >
                        <div className="absolute w-[100%] top-4 flex justify-center drop-shadow-xl z-20">
                            <div
                                className={`group/copy h-10 w-10 bg-slate-900 z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible`}
                            >
                                <img src="/images/assets/copy.svg" />
                                <span className="absolute top-12 bg-slate-900 flex items-center justify-center py-[2px] px-[6px] rounded-2xl font-medium text-white text-[12px] invisible group-hover/copy:visible">
                                    Copy Image
                                </span>
                            </div>
                            <div
                                className={"group/copy h-10 w-10 bg-slate-900 z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible mx-2"}
                            >
                                <img src="/images/assets/addtocoll.svg" />
                                <span className="absolute top-12 bg-slate-900 flex items-center justify-center py-[2px] px-[6px] rounded-2xl font-medium text-white text-[12px] invisible group-hover/copy:visible">
                                    Save to Collection
                                </span>
                            </div>
                            <div
                                className={"group/copy h-10 w-10 bg-slate-900 z-40 rounded-xl flex items-center justify-center cursor-pointer invisible group-hover/item:visible mx-2"}
                            >
                                <img src="/images/assets/threedots.svg" />
                                <span className="absolute top-12 bg-slate-900 flex items-center justify-center py-[2px] px-[6px] rounded-2xl font-medium text-white text-[12px] invisible group-hover/copy:visible">
                                    Menu
                                </span>
                            </div>
                        </div>
                        <div className="absolute w-[100%] top-16 flex justify-center drop-shadow-xl z-10">
                            <span className="bg-slate-900 flex items-center justify-center py-[2px] px-[6px] rounded-2xl font-medium text-white text-[12px] cursor-pointer invisible group-hover/menu:visible ">
                                Copy Image
                            </span>
                        </div>

                        {/* <div
                                        className="w-full rounded-2xl overflow-hidden min-720:gap-16 "
                                    >
                                        <Screen platform={1} src={toStorageUrl(screen.url)} />
                                    </div> */}
                    </motion.div>
                </div>

            </div>
            {/* <AnimatePresence>
                {openScreen && (
                    <>
                        <motion.div
                            className="fixed w-full h-[100vh] backdrop-blur-md bg-slate-900/70 z-[100] flex items-center justify-center"
                            onClick={() => setOpenScreen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.img
                                className="w-[400px] rounded-3xl bg-slate-800"
                                placeholder="blur"
                                width={428}
                                height={926}
                                alt="sreen"
                                src={toStorageUrl(scUrl)}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ y: 300 }}
                            />
                        </motion.div>

                        <div className="fixed right-10 top-[35%] w-[100px] py-2.5 bg-slate-900/30 border border-slate-800 rounded-2xl flex flex-col justify-between z-[100]">
                            {addColl && (
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed flex top-0 left-0 items-center justify-center w-[99vw] h-[100vh] backdrop-blur-md z-50"
                                    >
                                        <div className="flex flex-col w-[550px] py-10 px-10 bg-slate-900 rounded-2xl">
                                            <span className="text-white text-[14px]">
                                                Create a new collection
                                            </span>
                                            <hr className="mt-2 bg-slate-200 opacity-50" />
                                            <span className="text-white mt-7">Name</span>
                                            <input
                                                type="text"
                                                className="mt-5 rounded-lg bg-slate-200"
                                                value={collName}
                                                onChange={(e) => setCollName(e.target.value)}
                                            />
                                            <span className="text-white mt-10">
                                                Description (optional)
                                            </span>
                                            <textarea
                                                value={collDesc}
                                                onChange={(e) => setCollDesc(e.target.value)}
                                                className="mt-5 rounded-lg bg-slate-200"
                                            />
                                            <div className="flex mt-10 text-white text-[14px]">
                                                <span
                                                    onClick={handleAddCollection}
                                                    className="py-3 px-4 bg-orange-500 rounded-xl mr-5 cursor-pointer"
                                                >
                                                    Create Collection
                                                </span>
                                                <span
                                                    onClick={() => {
                                                        setAddColl(false);
                                                    }}
                                                    className="py-3 px-4 bg-slate-500 rounded-xl mr-5 cursor-pointer"
                                                >
                                                    Cancel
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            {!session ? (
                                <div className="w-[82px] h-[70px] opacity-30 mb-3 p-2 m-auto rounded-xl bg-[#0B1321] border-[3px] border-[#0B1321] cursor-pointer">
                                    <img
                                        className="ml-auto mb-3"
                                        src="/images/assets/like.svg"
                                    />
                                    <span className="text-white text-[12px] mt-auto">
                                        Like App
                                    </span>
                                </div>
                            ) : (
                                <div
                                    onClick={handleLike}
                                    className="w-[82px] h-[70px] mb-3 p-2 m-auto rounded-xl bg-[#0B1321] border-[3px] border-[#0B1321] hover:border-slate-700 cursor-pointer"
                                >
                                    <img
                                        className="ml-auto mb-3"
                                        src="/images/assets/like.svg"
                                    />
                                    <span className="text-white text-[12px] mt-auto">Like</span>
                                </div>
                            )}

                            <div
                                onClick={() => saveFile(toStorageUrl(scUrl))}
                                className="w-[82px] h-[70px] mb-3 px-1 py-2 m-auto rounded-xl bg-[#0B1321] border-[3px] border-[#0B1321] hover:border-slate-700 cursor-pointer"
                            >
                                <img className="ml-auto mb-3" src="/images/assets/like.svg" />
                                <span className="text-white text-[12px] mt-auto">
                                    Download
                                </span>
                            </div>
                            <div
                                onClick={() => {
                                    setSaveSc(!saveSc);
                                }}
                                className={`relative w-[82px] h-[70px] p-2 m-auto rounded-xl mb-3 bg-[#0B1321] border-[3px] border-[#0B1321] hover:border-slate-700 cursor-pointer`}
                            >
                                <img className="ml-auto mb-3" src="/images/assets/save.svg" />
                                <span className="text-white text-[12px] mt-auto relative">
                                    Save
                                </span>
                            </div>
                            {saveSc && (
                                <div className="absolute top-[190px] right-[110px] bg-slate-900 py-[16px] w-[250px] z-30 px-3 rounded-xl">
                                    {collectionGetted.map((data: any) => {
                                        return (
                                            <div
                                                onClick={() => handleAddToVollection(data.id)}
                                                className="flex items-center py-[6px] hover:bg-slate-800 rounded-lg mb-2 cursor-pointer"
                                            >
                                                <img
                                                    src={`${data.is_private
                                                        ? "/images/assets/privateIcon.svg"
                                                        : "/images/assets/publicIcon.svg"
                                                        }`}
                                                    className="mx-1 mr-2"
                                                />
                                                <span className="font-medium text-slate-100 text-[12px] mr-2">
                                                    {data.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                    <span
                                        onClick={() => {
                                            setAddColl(true);
                                        }}
                                        className="flex items-center justify-center py-2 bg-slate-800 rounded-2xl font- text-[12px] mt-3 text-slate-100 cursor-pointer"
                                    >
                                        Create Collection
                                    </span>
                                </div>
                            )}

                            <div
                                onClick={async () => {
                                    await navigator.clipboard.writeText(location.href);
                                }}
                                className="w-[82px] h-[76px] mb-3 p-2 m-auto rounded-xl bg-[#0B1321] border-[3px] border-[#0B1321] hover:border-slate-700 cursor-pointer"
                            >
                                <img className="ml-auto" src="/images/assets/copyLink2.svg" />
                                <span className="text-white text-[12px] mt-auto">
                                    Copy PNG
                                </span>
                            </div>
                            <div
                                onClick={async () => {
                                    await navigator.clipboard.writeText(toStorageUrl(scUrl));
                                }}
                                className="w-[82px] h-[76px] mb-0 p-2 m-auto rounded-xl bg-[#0B1321] border-[3px] border-[#0B1321] hover:border-slate-700 cursor-pointer"
                            >
                                <img className="ml-auto" src="/images/assets/copyLink2.svg" />
                                <span className="text-white text-[12px] mt-auto">
                                    Copy Link
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </AnimatePresence> */}
        </main>
    );
}

export default page