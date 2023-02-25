import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import BlurImage from "../../screen/Image"

const Search = () => {
  return (
    <motion.div 
        className="absolute left-6 right-6 top-4 h-[85%]"
        initial={{ opacity: 0, y:100 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
        >
        <p className='uppercase text-sm text-slate-400'>Search Results</p>
        <div className='flex space-x-4 mt-2 h-[90%] '>
            <div className='w-[30%] flex-col rounded-2xl bg-slate-800 scroll-py-2 py-2 snap-y scroll-smooth px-2 overflow-y-scroll scrollbar-hide'>
                <Link className='flex items-center p-2 hover:bg-slate-900 rounded-xl space-x-3' href={'#'}>
                    <Image
                        className="rounded-xl bg-slate-700"
                        width={48}
                        height={48}
                        src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/icons/4d1192a3-6ebc-425a-b70e-f197e066d5d2.png'}
                        alt="icon"
                    />
                    <div className="text-white">
                        <span className="text-[15px] font-semibold">TimeTree</span>
                        <span className="block text-[10px] font-light">Make a Shared Calendar</span>
                    </div>
                </Link>
                <Link className='flex items-center p-2 hover:bg-slate-800 rounded-xl space-x-3' href={'#'}>
                    <Image
                        className="rounded-xl bg-slate-700"
                        width={48}
                        height={48}
                        src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/icons/7e5a01a0-13b0-4389-8879-d4b6bfa8800e.png'}
                        alt="icon"
                    />
                    <div className="text-white">
                        <span className="text-[15px] font-semibold">TimeTree</span>
                        <span className="block text-[10px] font-light">Make a Shared Calendar</span>
                    </div>
                </Link>
                <Link className='flex items-center p-2 hover:bg-slate-900 rounded-xl space-x-3' href={'#'}>
                    <Image
                        className="rounded-xl bg-slate-700"
                        width={48}
                        height={48}
                        src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/icons/4d1192a3-6ebc-425a-b70e-f197e066d5d2.png'}
                        alt="icon"
                    />
                    <div className="text-white">
                        <span className="text-[15px] font-semibold">TimeTree</span>
                        <span className="block text-[10px] font-light">Make a Shared Calendar</span>
                    </div>
                </Link>
                <Link className='flex items-center p-2 hover:bg-slate-900 rounded-xl space-x-3' href={'#'}>
                    <Image
                        className="rounded-xl bg-slate-700"
                        width={48}
                        height={48}
                        src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/icons/7e5a01a0-13b0-4389-8879-d4b6bfa8800e.png'}
                        alt="icon"
                    />
                    <div className="text-white">
                        <span className="text-[15px] font-semibold">TimeTree</span>
                        <span className="block text-[10px] font-light">Make a Shared Calendar</span>
                    </div>
                </Link>
                <Link className='flex items-center p-2 hover:bg-slate-900 rounded-xl space-x-3' href={'#'}>
                    <Image
                        className="rounded-xl bg-slate-700"
                        width={48}
                        height={48}
                        src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/icons/4d1192a3-6ebc-425a-b70e-f197e066d5d2.png'}
                        alt="icon"
                    />
                    <div className="text-white">
                        <span className="text-[15px] font-semibold">TimeTree</span>
                        <span className="block text-[10px] font-light">Make a Shared Calendar</span>
                    </div>
                </Link>
                <Link className='flex items-center p-2 hover:bg-slate-900 rounded-xl space-x-3' href={'#'}>
                    <Image
                        className="rounded-xl bg-slate-700"
                        width={48}
                        height={48}
                        src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/icons/7e5a01a0-13b0-4389-8879-d4b6bfa8800e.png'}
                        alt="icon"
                    />
                    <div className="text-white">
                        <span className="text-[15px] font-semibold">TimeTree</span>
                        <span className="block text-[10px] font-light">Make a Shared Calendar</span>
                    </div>
                </Link>
                <Link className='flex items-center p-2 hover:bg-slate-900 rounded-xl space-x-3' href={'#'}>
                    <Image
                        className="rounded-xl bg-slate-700"
                        width={48}
                        height={48}
                        src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/icons/4d1192a3-6ebc-425a-b70e-f197e066d5d2.png'}
                        alt="icon"
                    />
                    <div className="text-white">
                        <span className="text-[15px] font-semibold">TimeTree</span>
                        <span className="block text-[10px] font-light">Make a Shared Calendar</span>
                    </div>
                </Link>
                <Link className='flex items-center p-2 hover:bg-slate-900 rounded-xl space-x-3' href={'#'}>
                    <Image
                        className="rounded-xl bg-slate-700"
                        width={48}
                        height={48}
                        src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/icons/7e5a01a0-13b0-4389-8879-d4b6bfa8800e.png'}
                        alt="icon"
                    />
                    <div className="text-white">
                        <span className="text-[15px] font-semibold">TimeTree</span>
                        <span className="block text-[10px] font-light">Make a Shared Calendar</span>
                    </div>
                </Link>
                <Link className='flex items-center p-2 hover:bg-slate-900 rounded-xl space-x-3' href={'#'}>
                    <Image
                        className="rounded-xl bg-slate-700"
                        width={48}
                        height={48}
                        src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/icons/4d1192a3-6ebc-425a-b70e-f197e066d5d2.png'}
                        alt="icon"
                    />
                    <div className="text-white">
                        <span className="text-[15px] font-semibold">TimeTree</span>
                        <span className="block text-[10px] font-light">Make a Shared Calendar</span>
                    </div>
                </Link>
                <Link className='flex items-center p-2 hover:bg-slate-900 rounded-xl space-x-3' href={'#'}>
                    <Image
                        className="rounded-xl bg-slate-700"
                        width={48}
                        height={48}
                        src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/icons/7e5a01a0-13b0-4389-8879-d4b6bfa8800e.png'}
                        alt="icon"
                    />
                    <div className="text-white">
                        <span className="text-[15px] font-semibold">TimeTree</span>
                        <span className="block text-[10px] font-light">Make a Shared Calendar</span>
                    </div>
                </Link>
            </div>
            <div className='w-[70%] p-2 rounded-2xl bg-slate-700'>

                {/* Header Area */}
                <div className='w-full flex justify-between'>
                    <div className='flex items-center p-2 rounded-xl space-x-3' >
                        <Image
                            className="rounded-md bg-slate-700"
                            width={32}
                            height={32}
                            src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/icons/4d1192a3-6ebc-425a-b70e-f197e066d5d2.png'}
                            alt="icon"
                        />
                        <div className="text-white">
                            <span className="text-[15px] font-semibold">TimeTree</span>
                            <span className="block text-[10px] font-light">Make a Shared Calendar</span>
                        </div>
                    </div>
                    <Link
                        className="min-w-fit h-full p-2  bg-slate-900 rounded-xl flex flex-col justify-between relative border-transparent border-2 hover:border-orange-500"
                        href={'#'}
                    >
                        <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 absolute right-2"
                        preserveAspectRatio="none"
                        >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.30834 2.3103C1.33203 3.2866 1.33203 4.85795 1.33203 8.00065C1.33203 11.1433 1.33203 12.7147 2.30834 13.691C3.28465 14.6673 4.856 14.6673 7.9987 14.6673C11.1414 14.6673 12.7128 14.6673 13.689 13.691C14.6654 12.7147 14.6654 11.1433 14.6654 8.00065C14.6654 4.85795 14.6654 3.2866 13.689 2.3103C12.7128 1.33398 11.1414 1.33398 7.9987 1.33398C4.856 1.33398 3.28465 1.33398 2.30834 2.3103ZM8.83203 4.66732C8.83203 4.94346 9.0559 5.16732 9.33203 5.16732H10.1249L8.64516 6.6471C8.4499 6.84238 8.4499 7.15892 8.64516 7.35418C8.84043 7.54945 9.15696 7.54945 9.35223 7.35418L10.832 5.87442V6.66732C10.832 6.94345 11.0559 7.16732 11.332 7.16732C11.6082 7.16732 11.832 6.94345 11.832 6.66732V4.66732C11.832 4.39118 11.6082 4.16732 11.332 4.16732H9.33203C9.0559 4.16732 8.83203 4.39118 8.83203 4.66732ZM7.35223 9.35419C7.5475 9.15892 7.5475 8.84238 7.35223 8.64712C7.15696 8.45185 6.84043 8.45185 6.64514 8.64712L5.16536 10.1269V9.33398C5.16536 9.05785 4.9415 8.83398 4.66536 8.83398C4.38922 8.83398 4.16536 9.05785 4.16536 9.33398V11.334C4.16536 11.6101 4.38922 11.834 4.66536 11.834H6.66536C6.9415 11.834 7.16536 11.6101 7.16536 11.334C7.16536 11.0579 6.9415 10.834 6.66536 10.834H5.87247L7.35223 9.35419Z"
                            fill="#F1F5F9"
                        />
                        </svg>
                        <p className="w-[80%] text-[10px] font-medium text-left text-white">
                        Open Application
                        </p>
                    </Link>
                </div>
                <div className='flex space-x-2 overflow-x-scroll px-2 pt-2'>
                    <BlurImage className='rounded-xl w-[20%]' platform={1} src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application//screens/78/ef198f6c-0ad0-4b18-9999-4002d84ae278.png'} />
                    <BlurImage className='rounded-xl w-[20%]' platform={1} src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application//screens/78/ef198f6c-0ad0-4b18-9999-4002d84ae278.png'} />
                    <BlurImage className='rounded-xl w-[20%]' platform={1} src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application//screens/78/ef198f6c-0ad0-4b18-9999-4002d84ae278.png'} />
                    <BlurImage className='rounded-xl w-[20%]' platform={1} src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application//screens/78/ef198f6c-0ad0-4b18-9999-4002d84ae278.png'} />
                    <BlurImage className='rounded-xl w-[20%]' platform={1} src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application//screens/78/ef198f6c-0ad0-4b18-9999-4002d84ae278.png'} />
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default Search