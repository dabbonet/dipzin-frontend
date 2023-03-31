import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FC } from 'react'
import { cn, rgbDataURL } from '@/lib/utils'
import SingleScreen from './screen/SingleScreen'
import { usePlatform } from '@/lib/platforms'

interface ShowcaseProps {
    selectedShowcase: any
    setSelectedShowcase: any
}

const Showcase: FC<ShowcaseProps> = ({ selectedShowcase, setSelectedShowcase }) => {

    const { selected: platform } = usePlatform()
    // console.log(selectedShowcase)
    return (
        <motion.div
            //layoutId={selected.id}
            className={"w-[100%] h-[100%] z-40 fixed inset-0 overflow-y-scroll py-16 xl:py-28 backdrop-blur-lg bg-slate-900/70"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
        >
            <motion.div className={"flex flex-col w-[80%] lg:w-[75%] mx-auto"}>
                <div className="flex my-8 items-center justify-between text-white z-50">
                    <div className="flex items-center">
                        <Image
                            className="ml-3 rounded-2xl bg-slate-700"
                            width={56}
                            height={56}
                            placeholder="blur"
                            blurDataURL={rgbDataURL(30, 41, 59)}
                            src={selectedShowcase?.icon}
                            alt="icon"
                        />
                        <div className="ml-4">
                            <span className="text-[32px] font-medium">{selectedShowcase?.name}</span>
                            <span className="block text-[16px] text-[#8F94A1]">
                                {selectedShowcase?.tag_line}
                            </span>
                        </div>
                    </div>

                    <div className=" p-1.5 relative bg-slate-900/40 rounded-2xl">
                        <div className="flex space-x-1.5">
                            <Link
                                className="min-w-fit p-2 h-[70px] bg-slate-900 rounded-xl flex flex-col justify-between relative border-transparent border-2 hover:border-orange-500"
                                href={{
                                    // pathname: "/application/[platform]/[slug]",
                                    // query: {
                                    //     platform: getPlatform(selected?.platform_id),
                                    //     slug: selected?.slug,
                                    // },
                                }}
                            >
                                <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 relative left-[85%]"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2.30834 2.3103C1.33203 3.2866 1.33203 4.85795 1.33203 8.00065C1.33203 11.1433 1.33203 12.7147 2.30834 13.691C3.28465 14.6673 4.856 14.6673 7.9987 14.6673C11.1414 14.6673 12.7128 14.6673 13.689 13.691C14.6654 12.7147 14.6654 11.1433 14.6654 8.00065C14.6654 4.85795 14.6654 3.2866 13.689 2.3103C12.7128 1.33398 11.1414 1.33398 7.9987 1.33398C4.856 1.33398 3.28465 1.33398 2.30834 2.3103ZM8.83203 4.66732C8.83203 4.94346 9.0559 5.16732 9.33203 5.16732H10.1249L8.64516 6.6471C8.4499 6.84238 8.4499 7.15892 8.64516 7.35418C8.84043 7.54945 9.15696 7.54945 9.35223 7.35418L10.832 5.87442V6.66732C10.832 6.94345 11.0559 7.16732 11.332 7.16732C11.6082 7.16732 11.832 6.94345 11.832 6.66732V4.66732C11.832 4.39118 11.6082 4.16732 11.332 4.16732H9.33203C9.0559 4.16732 8.83203 4.39118 8.83203 4.66732ZM7.35223 9.35419C7.5475 9.15892 7.5475 8.84238 7.35223 8.64712C7.15696 8.45185 6.84043 8.45185 6.64514 8.64712L5.16536 10.1269V9.33398C5.16536 9.05785 4.9415 8.83398 4.66536 8.83398C4.38922 8.83398 4.16536 9.05785 4.16536 9.33398V11.334C4.16536 11.6101 4.38922 11.834 4.66536 11.834H6.66536C6.9415 11.834 7.16536 11.6101 7.16536 11.334C7.16536 11.0579 6.9415 10.834 6.66536 10.834H5.87247L7.35223 9.35419Z"
                                        fill="#F1F5F9"
                                    />
                                </svg>
                                <p className="w-[60%] text-[11px] font-medium text-left text-white">
                                    Open Application
                                </p>
                            </Link>

                            <div
                                className="min-w-fit p-2 h-[70px] bg-slate-900 rounded-xl cursor-pointer flex flex-col justify-between relative border-transparent border-2 hover:border-orange-500"
                                onClick={() => {
                                    // window.open(selected.storelink, "_blank", "noreferrer");
                                }}
                            >
                                <svg
                                    width={17}
                                    height={17}
                                    viewBox="0 0 17 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 relative left-[78%]"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.8623 13.0813C13.2556 12.4813 13.4023 12.1746 13.7023 11.5013C11.489 10.6613 11.1356 7.50794 13.3223 6.30127C12.6556 5.46127 11.7156 4.97461 10.829 4.97461C10.189 4.97461 9.74895 5.14128 9.35561 5.29462C9.02228 5.42128 8.72228 5.53461 8.34895 5.53461C7.94895 5.53461 7.59562 5.40795 7.22228 5.27462C6.81562 5.12795 6.38895 4.97461 5.85561 4.97461C4.86228 4.97461 3.80228 5.58128 3.12895 6.62128C2.18228 8.08794 2.34895 10.8346 3.87562 13.1813C4.42229 14.0213 5.15562 14.9613 6.10895 14.9746C6.50895 14.9813 6.76895 14.8613 7.05562 14.7346C7.38228 14.588 7.73561 14.4279 8.35561 14.4279C8.97561 14.4213 9.32228 14.588 9.64895 14.7346C9.92895 14.8613 10.1823 14.9813 10.5756 14.9746C11.5423 14.9613 12.3156 13.9213 12.8623 13.0813Z"
                                        fill="white"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.6892 1.64258C10.7959 2.37591 10.4959 3.10259 10.1025 3.60925C9.68253 4.15592 8.94919 4.58257 8.24253 4.55591C8.11586 3.84924 8.44253 3.12257 8.84253 2.6359C9.28919 2.10257 10.0425 1.68924 10.6892 1.64258Z"
                                        fill="white"
                                    />
                                </svg>
                                <p className="w-[70%] text-[11px] font-medium text-left text-white">
                                    App Store
                                </p>
                            </div>

                            <div
                                onClick={() => {

                                }}
                                className="min-w-[80px] p-2 h-[70px] bg-slate-900 cursor-pointer rounded-xl flex flex-col justify-between relative border-transparent border-2 hover:border-orange-500"
                            >
                                <img className="ml-auto mb-3" src="/images/assets/save.svg" />
                                <span className="w-[70%] text-[11px] font-medium text-left text-white">
                                    Save
                                </span>
                            </div>

                            <div
                                className="min-w-[80px] max-w-[100px] cursor-pointer p-2 h-[70px] bg-slate-900 rounded-xl flex flex-col justify-between relative border-transparent border-2 hover:border-orange-500"
                                onClick={() => {
                                }}
                            >
                                <svg
                                    width={17}
                                    height={17}
                                    viewBox="0 0 17 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 relative left-[82%]"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <path
                                        d="M13.7969 6.89164H11.8702C10.2902 6.89164 9.00354 5.60497 9.00354 4.02497V2.09831C9.00354 1.73164 8.70354 1.43164 8.33687 1.43164H5.51021C3.45687 1.43164 1.79688 2.76497 1.79688 5.14497V11.0516C1.79688 13.4316 3.45687 14.765 5.51021 14.765H10.7502C12.8035 14.765 14.4635 13.4316 14.4635 11.0516V7.55831C14.4635 7.19164 14.1635 6.89164 13.7969 6.89164ZM8.31687 10.6183L6.98354 11.9516C6.93687 11.9983 6.87687 12.0383 6.81687 12.0583C6.75687 12.085 6.69687 12.0983 6.63021 12.0983C6.56354 12.0983 6.50354 12.085 6.44354 12.0583C6.39021 12.0383 6.33687 11.9983 6.29687 11.9583C6.29021 11.9516 6.28354 11.9516 6.28354 11.945L4.95021 10.6116C4.75687 10.4183 4.75687 10.0983 4.95021 9.90497C5.14354 9.71164 5.46354 9.71164 5.65687 9.90497L6.13021 10.3916V7.59831C6.13021 7.32497 6.35687 7.09831 6.63021 7.09831C6.90354 7.09831 7.13021 7.32497 7.13021 7.59831V10.3916L7.61021 9.91164C7.80354 9.71831 8.12354 9.71831 8.31687 9.91164C8.51021 10.105 8.51021 10.425 8.31687 10.6183Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M11.7474 5.97131C12.3807 5.97798 13.2607 5.97798 14.0141 5.97798C14.3941 5.97798 14.5941 5.53131 14.3274 5.26464C13.3674 4.29798 11.6474 2.55798 10.6607 1.57131C10.3874 1.29798 9.91406 1.48464 9.91406 1.86464V4.19131C9.91406 5.16464 10.7407 5.97131 11.7474 5.97131Z"
                                        fill="white"
                                    />
                                </svg>
                                <p className="w-[70%] text-[11px] font-medium text-left text-white">
                                    Download Showcase
                                </p>
                            </div>

                            <div
                                className="min-w-[80px] max-w-[100px] p-2 h-[70px] bg-slate-900 rounded-xl cursor-pointer flex flex-col justify-between relative border-transparent border-2 hover:border-orange-500"
                                onClick={() => {
                                    // navigator.clipboard.writeText(
                                    //     "dipzin.com/application/ios/" + selected.slug //need fix
                                    // )
                                }}
                            >
                                <svg
                                    width={17}
                                    height={17}
                                    viewBox="0 0 17 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 relative left-[82%]"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <path
                                        d="M9.3876 2.91228L6.26093 2.41895C3.65426 2.01228 2.4476 2.89228 2.03427 5.49895L1.54093 8.62561C1.27427 10.3323 1.55427 11.4389 2.52093 12.1123C3.0276 12.4723 3.72093 12.7123 4.62093 12.8523L7.7476 13.3456C10.3543 13.7523 11.5609 12.8723 11.9743 10.2656L12.4609 7.13895C12.5409 6.62561 12.5743 6.16561 12.5476 5.75895C12.4609 4.09228 11.4809 3.23895 9.3876 2.91228ZM5.62093 7.22561C4.84093 7.22561 4.2076 6.59228 4.2076 5.81895C4.2076 5.03895 4.84093 4.40561 5.62093 4.40561C6.39426 4.40561 7.0276 5.03895 7.0276 5.81895C7.0276 6.59228 6.39426 7.22561 5.62093 7.22561Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M13.7947 9.97255L12.7947 12.9792C11.9614 15.4859 10.628 16.1526 8.12135 15.3192L5.11469 14.3192C4.17469 14.0059 3.49469 13.6192 3.05469 13.1326C3.47469 13.2992 3.96135 13.4259 4.51469 13.5126L7.64802 14.0059C8.07469 14.0726 8.47469 14.1059 8.84802 14.1059C11.048 14.1059 12.228 12.9192 12.6347 10.3659L13.1214 7.23922C13.188 6.85255 13.2147 6.51255 13.2147 6.19922C14.228 7.03255 14.3747 8.21922 13.7947 9.97255Z"
                                        fill="white"
                                    />
                                </svg>
                                <p className="w-[70%] text-[11px] font-medium text-left text-white">
                                    Copy Link
                                </p>
                            </div>

                            <div
                                className="min-w-[80px] max-w-[100px] p-2 h-[70px] bg-slate-900 rounded-xl cursor-pointer flex flex-col justify-between relative border-transparent border-2 hover:border-orange-500"
                                onClick={() => setSelectedShowcase(null)}
                            >
                                <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 relative left-[82%]"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <path
                                        d="M8 1.5C4.41594 1.5 1.5 4.41594 1.5 8C1.5 11.5841 4.41594 14.5 8 14.5C11.5841 14.5 14.5 11.5841 14.5 8C14.5 4.41594 11.5841 1.5 8 1.5ZM10.3534 9.64656C10.4018 9.69253 10.4405 9.74772 10.4672 9.80888C10.494 9.87003 10.5082 9.93592 10.509 10.0027C10.5099 10.0694 10.4974 10.1356 10.4722 10.1974C10.4471 10.2593 10.4098 10.3154 10.3626 10.3626C10.3154 10.4098 10.2593 10.4471 10.1974 10.4722C10.1356 10.4974 10.0694 10.5099 10.0027 10.509C9.93592 10.5082 9.87003 10.494 9.80888 10.4672C9.74772 10.4405 9.69253 10.4018 9.64656 10.3534L8 8.70719L6.35344 10.3534C6.25891 10.4432 6.13303 10.4926 6.00265 10.4909C5.87227 10.4892 5.7477 10.4367 5.6555 10.3445C5.5633 10.2523 5.51076 10.1277 5.50909 9.99735C5.50742 9.86697 5.55675 9.74109 5.64656 9.64656L7.29281 8L5.64656 6.35344C5.55675 6.25891 5.50742 6.13303 5.50909 6.00265C5.51076 5.87227 5.5633 5.7477 5.6555 5.6555C5.7477 5.5633 5.87227 5.51076 6.00265 5.50909C6.13303 5.50742 6.25891 5.55675 6.35344 5.64656L8 7.29281L9.64656 5.64656C9.74109 5.55675 9.86697 5.50742 9.99735 5.50909C10.1277 5.51076 10.2523 5.5633 10.3445 5.6555C10.4367 5.7477 10.4892 5.87227 10.4909 6.00265C10.4926 6.13303 10.4432 6.25891 10.3534 6.35344L8.70719 8L10.3534 9.64656Z"
                                        fill="#F8FAFC"
                                    />
                                </svg>
                                <p className="w-[70%] text-[11px] font-medium text-left text-white">
                                    Close Showcase
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*-------------------------------------------------------*/}
                <div
                    className={cn("grid ml-auto mr-auto z-50 w-full", platform === 3 ? "grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-10 " : "grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10")}
                >
                    {selectedShowcase?.screens.map((item: any, index: number) => (
                        <SingleScreen key={index} src={item} />
                    ))}
                </div>

            </motion.div>
            <motion.div
                onClick={() => setSelectedShowcase(null)}
                className={
                    "w-[100%] h-[100%] fixed top-0 bg-transparent"
                }
            ></motion.div>
        </motion.div>
    )
}

export default Showcase