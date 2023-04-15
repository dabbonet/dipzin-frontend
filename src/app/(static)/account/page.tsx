import { ActionBar, SquareButton } from '@/components/ActionBar'
import Icons from '@/components/Icons'
import { FC } from 'react'

interface pageProps {

}

const Account: FC<pageProps> = ({ }) => {
    return (
        <div className='max-w-7xl mx-auto tracking-wide'>
            {/* Welcome Area */}
            <div className=''>
                <h1 className='text-7xl text-slate-300'>Welcome to dipzin,</h1>
                <p className='text-lg text-slate-500'>Dipzin is a web application aimed for UI/UX designers and product managers.</p>
            </div>

            {/* Head Area */}
            <div className='flex justify-between mt-12 items-center'>
                <div className='flex items-center space-x-8'>
                    {/* Avatar */}
                    <div className='bg-slate-700 w-28 h-28 rounded-2xl'></div>
                    <div>
                        <h2 className='text-4xl'>Account Details</h2>
                        <p className='font-extralight tracking-wide text-slate-300'>Here you can view and edit your account information </p>
                    </div>
                </div>
                <ActionBar className='h-fit'>
                    <SquareButton className='w-32'>
                        <SquareButton.Title className='w-[70%]'>Complete Profile</SquareButton.Title>
                        <SquareButton.Icon>
                            <Icons.Save />
                        </SquareButton.Icon>
                    </SquareButton>
                </ActionBar>
            </div>

            {/* Account Details Area */}
            <div className='bg-slate-900 bg-opacity-50 mt-8 rounded-2xl w-full grid gap-4 px-8 py-8 grid-cols-2'>
                <div className=''>
                    <label className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">First name</label>
                    <input type="text" id="first_name" className="bg-slate-100 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="John" required />
                </div>
                <div className=''>
                    <label className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">Username</label>
                    <input type="text" id="first_name" className="bg-slate-100 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="John" required />
                </div>
                <div className=''>
                    <label className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">Bio</label>
                    <input type="text" id="first_name" className="bg-slate-100 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="John" />
                </div>
                <div className=''>
                    <label className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">Email Address</label>
                    <input type="text" id="first_name" className="bg-slate-100 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="John" required />
                </div>
                <div className=''>
                    <label className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">Title</label>
                    <input type="text" id="first_name" className="bg-slate-100 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="John" required />
                </div>
                <div className=''>
                    <label className="block mb-2 text-sm font-normal text-gray-900 dark:text-slate-400">Country</label>
                    <input type="text" id="first_name" className="bg-slate-100 border border-transparent text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full px-4 py-3.5 dark:bg-slate-950/40 dark:placeholder-slate-300 dark:text-slate-100 dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="John" required />
                </div>
            </div>

            {/* Account Details Area */}
            <div className='bg-slate-900 bg-opacity-50 mt-8 rounded-2xl w-full grid gap-4 px-8 py-8 grid-cols-2 min-h-[600px]'>
                <div className='col-span-2'>
                    <h2 className='text-3xl'>Start Free! You've got 14 days Trial.</h2>
                    <p className='font-extralight tracking-wide text-slate-300'>Unlock The full potential in the platform by choosing a <b className='text-orange-500'>Premium Plan.</b></p>
                </div>
            </div>

        </div>
    )
}

export default Account