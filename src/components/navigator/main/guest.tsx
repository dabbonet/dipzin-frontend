import Link from 'next/link';
import router from 'next/router';

const GuestNavigator = () => {
  return (
    <div className="fixed bottom-10 h-auto flex items-center bg-aqua-600 rounded-full text-aqua-50 p-3 space-x-8 font-medium text-[18px]">
      <div className='flex'>

        <img src="/images/assets/checkSearchBar.svg" className="mr-2" alt="dipzin" />
        <div className="flex-col">
          <span className="font-semibold text-lg tracking-wide">
            Join the Dipzin Community Today
          </span>
          <span className="block font-medium text-[14px]">
            Find, Share, and Create Digital Inspiration.
          </span>
        </div>
      </div>
      <Link
        className="py-2 px-5 bg-aqua-100 rounded-3xl text-aqua-600 ml-2 cursor-pointer hover:bg-aqua-800 hover:text-aqua-100"
        href={'/access'}
      >
        Try it free
      </Link>
    </div>
  )
}

export default GuestNavigator