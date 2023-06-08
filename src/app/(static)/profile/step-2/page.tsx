import StepTwoButton from "@/components/stepTwoButton";
import Link from "next/link";

export default function page({ }) {
    return <div className=" flex gap-x-36 flex-wrap justify-center items-center">
        <div className=" flex-1">
            <p className=" text-slate-400 text-base font-normal"><span className=" text-aqua-500">2/2</span> Customize Experience</p>
            <h1 className=" text-6xl text-white font-medium mb-3">Personalize Your Experience</h1>
            <p className=" text-slate-400 mb-28">
                Let's personalize your experience on Dipzin. Please answer a few questions about your interests and preferences.
                <br />
                <br />
                <br />
                <br />
                As always, your privacy is important to us, so please review our privacy policy and terms of service before proceeding.
            </p>
            <div>
                <p className=" text-slate-400 text-xs">Onboarding Video</p>
                <img src="/images/assets/profile-steper-video-screen.svg" className=" -mt-14 -ml-20" alt="" />
            </div>
        </div>
        <div className=" flex-1">
            <p className=" text-slate-300">Which best describes you?</p>
            <div className=" grid grid-cols-1 lg:grid-cols-2 mt-3 gap-4">
                <label htmlFor="Product Designer" className=" flex items-center bg-slate-900 py-2 pl-4 pr-7 rounded-lg">
                    <input type="checkbox" name="" id="Product Designer" className=" mr-4  before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded  before:w-5 relative before:absolute  before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center"/>
                    <div className=" flex justify-center items-center bg-slate-800 p-2 border border-solid border-slate-700 rounded-lg mr-4 checked:border-aqua-300">
                        <img src="/images/assets/product-designer.svg" alt="" />
                    </div>
                    <span className=" w-fit text-xs font-normal">Product Designer</span>
                </label>
                <label htmlFor="Product Designer2" className=" flex items-center bg-slate-900 py-2 pl-4 pr-7 rounded-lg">
                    <input type="checkbox" name="" id="Product Designer2" className=" mr-4  before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded  before:w-5 relative before:absolute  before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center"/>
                    <div className=" flex justify-center items-center bg-slate-800 p-2 border border-solid border-slate-700 rounded-lg mr-4 checked:border-aqua-300">
                        <img src="/images/assets/product-designer.svg" alt="" />
                    </div>
                    <span className=" w-fit text-xs font-normal">Product Designer</span>
                </label>
                <label htmlFor="Product Designer3" className=" flex items-center bg-slate-900 py-2 pl-4 pr-7 rounded-lg">
                    <input type="checkbox" name="" id="Product Designer3" className=" mr-4  before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded  before:w-5 relative before:absolute  before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center"/>
                    <div className=" flex justify-center items-center bg-slate-800 p-2 border border-solid border-slate-700 rounded-lg mr-4 checked:border-aqua-300">
                        <img src="/images/assets/product-designer.svg" alt="" />
                    </div>
                    <span className=" w-fit text-xs font-normal">Product Designer</span>
                </label>
                <label htmlFor="Product Designer4" className=" flex items-center bg-slate-900 py-2 pl-4 pr-7 rounded-lg">
                    <input type="checkbox" name="" id="Product Designer4" className=" mr-4  before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded  before:w-5 relative before:absolute  before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center"/>
                    <div className=" flex justify-center items-center bg-slate-800 p-2 border border-solid border-slate-700 rounded-lg mr-4 checked:border-aqua-300">
                        <img src="/images/assets/product-designer.svg" alt="" />
                    </div>
                    <span className=" w-fit text-xs font-normal">Product Designer</span>
                </label>
                <label htmlFor="Product Designer5" className=" flex items-center bg-slate-900 py-2 pl-4 pr-7 rounded-lg">
                    <input type="checkbox" name="" id="Product Designer5" className=" mr-4  before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded  before:w-5 relative before:absolute  before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center"/>
                    <div className=" flex justify-center items-center bg-slate-800 p-2 border border-solid border-slate-700 rounded-lg mr-4 checked:border-aqua-300">
                        <img src="/images/assets/product-designer.svg" alt="" />
                    </div>
                    <span className=" w-fit text-xs font-normal">Product Designer</span>
                </label>
                <label htmlFor="Product Designer6" className=" flex items-center bg-slate-900 py-2 pl-4 pr-7 rounded-lg">
                    <input type="checkbox" name="" id="Product Designer6" className=" mr-4  before:checked:content-['✓'] before:checked:bg-aqua-600 bg-opacity-0 before:rounded  before:w-5 relative before:absolute  before:h-5 before:bg-slate-800 before:-top-1 before:-left-1 before:flex before:items-center before:justify-center"/>
                    <div className=" flex justify-center items-center bg-slate-800 p-2 border border-solid border-slate-700 rounded-lg mr-4 checked:border-aqua-300">
                        <img src="/images/assets/product-designer.svg" alt="" />
                    </div>
                    <span className=" w-fit text-xs font-normal">Product Designer</span>
                </label>
            </div>
            <div className=" mt-9">
                <h3 className=" text-slate-300 mb-1 text-base font-normal">Interests</h3>
                <p className=" text-slate-500 mb-4">Help us develop and prioritize features, and customize your experience.</p>
                <div className=" flex flex-wrap gap-3 mb-8">
                    <StepTwoButton tilte='Analytics apps'/>
                    <StepTwoButton tilte={'Customer feedback tools'}/>
                    <StepTwoButton tilte={'Finance apps'}/>
                    <StepTwoButton tilte={'accebility'}/>
                    <StepTwoButton tilte={'API integration'}/>
                    <StepTwoButton tilte={'typography'}/>
                    <StepTwoButton tilte={'native app dev'}/>
                    <StepTwoButton tilte={'Customer feedback tools'}/>
                </div>
                <div className=" flex justify-between items-center">
                    <Link href='/' className=" text-slate-400">Skip</Link>
                    <div className=" flex items-center gap-4">
                        <Link href='/profile/step-1' className=" py-3 px-9 bg-slate-800 text-slate-500 rounded-lg">Back</Link>
                        <Link href='/profile/step-1' className=" py-3 px-9 bg-gradient-to-tr from-aqua-400 bg-aqua-600 text-aqua-950 font-medium rounded-lg">Next</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}