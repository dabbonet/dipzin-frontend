const CollectionSideNavigator = () => {
  return (
    <div className="fixed right-10 top-[45%] md:hidden lg:w-[100px] xl:w-[110px] xxl:w-[130px] h-auto space-y-2 py-2 px-2 bg-slate-900/30 border border-slate-800 rounded-2xl flex flex-col justify-between">
        <a href="#" className="flex-grow-0 flex-shrink-0 w-full lg:h-[80px] xl:h-[80px] xxl:h-[90px] relative m-auto rounded-xl bg-slate-800 border-[2.5px] border-transparent hover:border-slate-700 cursor-pointer focus:border-orange-500">
            <p className=" absolute left-[8px] lg:bottom-[4px] text-[0.7rem] xl:text-[0.8rem] font-medium text-left text-white">
                Publish Collection
            </p>
            <svg
                width={17}
                height={17}
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 absolute right-[8px] top-[8px]"
                preserveAspectRatio="xMidYMid meet"
            >
                <path
                d="M10.9209 1.64258H5.33427C2.9076 1.64258 1.46094 3.08924 1.46094 5.51591V11.0959C1.46094 13.5292 2.9076 14.9759 5.33427 14.9759H10.9143C13.3409 14.9759 14.7876 13.5292 14.7876 11.1026V5.51591C14.7943 3.08924 13.3476 1.64258 10.9209 1.64258ZM11.6276 8.52924C11.6276 8.80258 11.4009 9.02924 11.1276 9.02924C10.8543 9.02924 10.6276 8.80258 10.6276 8.52924V6.51591L5.48094 11.6626C5.38094 11.7626 5.25427 11.8092 5.1276 11.8092C5.00094 11.8092 4.87427 11.7626 4.77427 11.6626C4.58094 11.4692 4.58094 11.1492 4.77427 10.9559L9.92094 5.80924H7.9076C7.63427 5.80924 7.4076 5.58258 7.4076 5.30924C7.4076 5.03591 7.63427 4.80924 7.9076 4.80924H11.1276C11.4009 4.80924 11.6276 5.03591 11.6276 5.30924V8.52924Z"
                fill="white"
                />
            </svg>
        </a>
        <a href="#" className="flex-grow-0 flex-shrink-0 w-full lg:h-[80px] xl:h-[80px] xxl:h-[90px] relative m-auto rounded-xl bg-slate-800 border-[2.5px] border-transparent hover:border-slate-700 cursor-pointer focus:border-orange-500">
            <p className=" absolute left-[8px] lg:bottom-[4px] text-[0.7rem] xl:text-[0.8rem] font-medium text-left text-white">
                Like Collection
            </p>
            <svg
                width={17}
                height={17}
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 absolute right-[8px] top-[8px]"
                preserveAspectRatio="xMidYMid meet"
            >
                <path
                d="M11.0876 2.375C9.88094 2.375 8.80094 2.96167 8.1276 3.86167C7.45427 2.96167 6.37427 2.375 5.1676 2.375C3.12094 2.375 1.46094 4.04167 1.46094 6.10167C1.46094 6.895 1.5876 7.62833 1.8076 8.30833C2.86094 11.6417 6.1076 13.635 7.71427 14.1817C7.94094 14.2617 8.31427 14.2617 8.54094 14.1817C10.1476 13.635 13.3943 11.6417 14.4476 8.30833C14.6676 7.62833 14.7943 6.895 14.7943 6.10167C14.7943 4.04167 13.1343 2.375 11.0876 2.375Z"
                fill="white"
                />
            </svg>
        </a>
        <a href="#" className="flex-grow-0 flex-shrink-0 w-full lg:h-[80px] xl:h-[80px] xxl:h-[90px] relative m-auto rounded-xl bg-slate-800 border-[2.5px] border-transparent hover:border-slate-700 cursor-pointer focus:border-orange-500">
            <p className=" absolute left-[8px] lg:bottom-[4px] text-[0.7rem] xl:text-[0.8rem] font-medium text-left text-white">
                Bulk Download
            </p>
            <svg
                width={17}
                height={17}
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 absolute right-[8px] top-[8px]"
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
        </a>
        <a href="#" className="flex-grow-0 flex-shrink-0 w-full lg:h-[80px] xl:h-[80px] xxl:h-[90px] relative m-auto rounded-xl bg-slate-800 border-[2.5px] border-transparent hover:border-slate-700 cursor-pointer focus:border-orange-500">
            <p className=" absolute left-[8px] lg:bottom-[4px] text-[0.7rem] xl:text-[0.8rem] font-medium text-left text-white">
                Copy Link
            </p>
            <svg
                width={17}
                height={17}
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 absolute right-[8px] top-[8px]"
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
        </a>
    </div>
  )
}

export default CollectionSideNavigator