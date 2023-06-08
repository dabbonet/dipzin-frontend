export default function page({ }) {
    return <div className=" flex gap-x-36 flex-wrap justify-center items-center">
        <div className=" flex-1">
            <p className=" text-slate-400 text-base font-normal"><span className=" text-aqua-500">1/2</span> Basic Info</p>
            <h1 className=" text-6xl text-white font-medium mb-3">Let’s setup your account.</h1>
            <p className=" text-slate-400 mb-28">Let's get to know you better! Your privacy is important to us, so please take a moment to review our privacy policy and terms of service before getting started. </p>
            <div>
                <p className=" text-slate-400 text-xs">Onboarding Video</p>
                <img src="/images/assets/profile-steper-video-screen.svg" className=" -mt-14 -ml-20" alt="" />
            </div>
        </div>
        <div className=" flex-1">
            <div className=" mb-5">
                <p className=" text-slate-300 text-base font-normal">Profile Picture</p>
                <div className=" grid grid-cols-6 gap-x-2">
                    <img src="/images/assets/Manager-1.svg" alt="" />
                    <img src="/images/assets/Manager-1.svg" alt="" />
                    <img src="/images/assets/Manager-1.svg" alt="" />
                    <img src="/images/assets/Manager-1.svg" alt="" />
                    <img src="/images/assets/Manager-1.svg" alt="" />
                    <img src="/images/assets/Manager-1.svg" alt="" />
                </div>
            </div>
            <form action="">
                <div className=" flex flex-col gap-y-2 mb-4">
                    <label htmlFor="name" className=" text-slate-300">Name <span className=" text-aqua-300">*</span></label>
                    <input type="text" id="name" placeholder="Full Name" className=" bg-transparent border border-solid border-slate-600 rounded-lg indent-4 py-4"/>
                </div>
                <div className=" flex flex-col gap-y-2 mb-4">
                    <label htmlFor="name" className=" text-slate-300">Username <span className=" text-aqua-300">*</span></label>
                    <input type="text" id="name" placeholder="@dipzin" className=" bg-transparent border border-solid border-slate-600 rounded-lg indent-4 py-4"/>
                </div>
                <div className=" flex flex-col gap-y-2 mb-4">
                    <label htmlFor="name" className=" text-slate-300">Email Address <span className=" text-aqua-300">*</span></label>
                    <input type="text" id="name" placeholder="hi@example.com" className=" bg-transparent border border-solid border-slate-600 rounded-lg indent-4 py-4"/>
                </div>
                <div className=" mb-4">
                    <p className=" text-slate-300">Notifications <span className=" text-aqua-300">*</span></p>
                    <p className=" text-slate-500 font-medium text-xs">Choose type of notifications you want to receive</p>
                    <div className=" grid grid-cols-2 gap-x-12 gap-y-4 mt-5">
                        <div className=" flex gap-2  items-center">
                            <input type="checkbox" name="" id="feature" className="  before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded-lg  before:w-5 relative before:absolute  before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center " />
                            <label htmlFor="feature">Feature Releases</label>
                        </div>
                        <div className=" flex gap-2 items-center">
                            <input type="checkbox" name="" id="feature2" className="  before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded-lg  before:w-5 relative before:absolute  before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center " />
                            <label htmlFor="feature2">Technical Newsletter</label>
                        </div>
                        <div className=" flex gap-2 items-center">
                            <input type="checkbox" name="" id="feature3" className="  before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded-lg  before:w-5 relative before:absolute  before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center " />
                            <label htmlFor="feature3">Onboarding Emails</label>
                        </div>
                        <div className=" flex gap-2 items-center">
                            <input type="checkbox" name="" id="feature4" className="  before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded-lg  before:w-5 relative before:absolute  before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center " />
                            <label htmlFor="feature4">Account Updates</label>
                        </div>
                        <div className=" flex gap-2 items-center">
                            <input type="checkbox" name="" id="feature5" className="  before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded-lg  before:w-5 relative before:absolute  before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center " />
                            <label htmlFor="feature5">No Emails</label>
                        </div>
                    </div>
                </div>
                <div className=" flex justify-end gap-x-4">
                    <button className=" rounded-lg bg-slate-900 py-2 px-9 text-sm font-medium">back</button>
                    <button className=" rounded-lg bg-gradient-to-tr from-aqua-400 to-aqua-600 py-2 px-9 text-sm font-medium text-aqua-950">Next</button>
                </div>
            </form>
            
        </div>
    </div>
}