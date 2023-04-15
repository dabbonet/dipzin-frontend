const NotFoundPreview = () => {
  return (
    <div className='w-[70%] p-2 rounded-2xl bg-slate-800'>

      {/* Header Area */}
      <div className='w-full flex justify-between'>
        <div className="flex-col p-8 rounded-xl space-x-3 w-full" >
          <h1 className="text-slate-200 text-3xl font-semibold">{"Sorry, we couldn't find it."}</h1>
          {/* <p className="text-orange-500 text-sm font-semibold !ml-0">Let us help you find what you need</p> */}
          <p className="text-slate-400 text-sm mt-2 !ml-0">Let us help you find what you need, Why not try searching for: <span className="text-slate-300 font-semibold">Entertainment, Navigation, Account Setup, Feedback.</span></p>
          <img src="/images/assets/notFound.svg" className="w-[100%] h-[50%] mt-10" alt="Not found" />
        </div>
      </div>

    </div>
  )
}

export { NotFoundPreview }