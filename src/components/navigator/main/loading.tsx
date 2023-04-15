
const PreviewSkeleton = () => {
    return (
        <div className='max-w-[70%] w-full h-full p-2 rounded-2xl bg-slate-800'>
            <div className="absolute top-0 left-0 rounded-2xl z-10 bg-gradient-to-b from-slate-900/5 to-slate-900/60 w-full h-full"></div>
            {/* Header Area */}
            <div className='w-full flex justify-between'>
                <div className='flex items-center p-2 rounded-xl space-x-3 animate-pulse' >
                    <div className="rounded-xl w-[48px] h-[48px] flex items-center justify-center bg-slate-900/50 "></div>
                    <div className="flex flex-col space-y-2 relative">
                        <div className="bg-slate-900/50 h-3.5 w-40 rounded-lg"></div>
                        <div className="bg-slate-900/50 h-2 mt-4 w-40 rounded-lg"></div>
                    </div>
                </div>

            </div>
            <div className='w-full flex flex-row h-[420px] space-x-4 overflow-x-scroll px-2 pt-2 scrollbar-hide'>
                <ScreensSkeleton />
            </div>
        </div>
    )
}
const ScreensSkeleton = () => {
    return (
        <>
            <div className="bg-slate-900/50 h-full min-w-[190px] w-auto rounded-2xl animate-pulse"></div>
            <div className="bg-slate-900/50 h-full min-w-[190px] w-auto rounded-2xl animate-pulse"></div>
            <div className="bg-slate-900/50 h-full min-w-[190px] w-auto rounded-2xl animate-pulse"></div>
            <div className="bg-slate-900/50 h-full min-w-[190px] w-auto rounded-2xl animate-pulse"></div>
            <div className="bg-slate-900/50 h-full min-w-[190px] w-auto rounded-2xl animate-pulse"></div>
            <div className='max-w-[70%] w-full h-full p-2 rounded-2xl bg-slate-800'></div>
        </>
    )
}

const ResultsSekelton = () => {
    return (
        <div className='w-[30%] flex-col rounded-2xl bg-slate-800 py-2 px-2  relative overflow-y-hidden'>
            <div className="absolute top-0 left-0 rounded-2xl z-10 bg-gradient-to-b from-slate-900/5 to-slate-900/80 w-full h-full"></div>
            <div className="animate-pulse space-y-2 ">
                <div className='flex items-center p-2 bg-slate-700 rounded-xl space-x-3 h-[64px]'></div>
                <div className='flex items-center p-2 bg-slate-700 rounded-xl space-x-3 h-[64px]'></div>
                <div className='flex items-center p-2 bg-slate-700 rounded-xl space-x-3 h-[64px]'></div>
                <div className='flex items-center p-2 bg-slate-700 rounded-xl space-x-3 h-[64px]'></div>
                <div className='flex items-center p-2 bg-slate-700 rounded-xl space-x-3 h-[64px]'></div>
                <div className='flex items-center p-2 bg-slate-700 rounded-xl space-x-3 h-[64px]'></div>
                <div className='flex items-center p-2 bg-slate-700 rounded-xl space-x-3 h-[64px]'></div>
            </div>
        </div>
    );
}

export { PreviewSkeleton, ResultsSekelton, ScreensSkeleton }