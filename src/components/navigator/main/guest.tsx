import Link from 'next/link';
import router from 'next/router';

const GuestNavigator = () => {
  return (
    <div className="fixed bottom-12 h-auto flex items-center bg-orange-600 rounded-[60px] text-white p-3 font-medium text-[18px]">
      <img src="/images/assets/verf.svg" className="mr-4" />
      <div className="flex-col">
        <span className="font-bold text-[16px]">
          Join the Dipzin Community Today
        </span>
        <span className="block font-medium text-[14px]">
          Find, Share, and Create Digital Inspiration.
        </span>
      </div>

      <Link
        className="py-2 px-5 bg-orange-400 rounded-3xl ml-10 cursor-pointer hover:bg-orange-500"
        href={'/access'}
      >
        Login
      </Link>
      <Link
        className="py-2 px-5 bg-orange-100 rounded-3xl text-orange-600 ml-2 cursor-pointer hover:bg-orange-300"
        href={'/access'}
      >
        Try it free
      </Link>
    </div>
  )
}

export default GuestNavigator