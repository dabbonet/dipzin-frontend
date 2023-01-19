
type ScreenProps = {
    src: string
}

const Screen = ({ src }: ScreenProps) => {

    return (
        <div className="flex justify-center items-center relative group/item">
            <div className="rounded-2xl overflow-hidden min-720:gap-16 transform transition duration-500 hover:scale-105">
                <img className="h-full w-full border-[3px] border-transparent rounded-2xl transform opacity duration-500 hover:border-slate-300" src={src} />
                <div className="absolute w-[100%] top-4 flex justify-center drop-shadow-xl ">
                    <img className=" h-[25%] w-[25%] transform transition duration-500 hover:scale-110 cursor-pointer opacity-0 group-hover/item:opacity-100" src="/images/assets/addpng.svg" />
                    <img className=" h-[25%] w-[25%] transform transition duration-500 hover:scale-110 cursor-pointer opacity-0 group-hover/item:opacity-100" src="/images/assets/addcopy.svg" />
                    <img className=" h-[25%] w-[25%] transform transition duration-500 hover:scale-110 cursor-pointer opacity-0 group-hover/item:opacity-100" src="/images/assets/addcollection.svg" />
                </div>
                <div className="absolute w-[100%] bottom-3 flex justify-start items-center drop-shadow-xl opacity-0 transform transition duration-500 group-hover/item:opacity-100 z-20" >
                    <img className="h-[15%] w-[15%] ml-[4%] rounded-full" src="/images/assets/appicon.svg" />
                    <div className="text-white">
                        <span className="ml-2 text-[15px] font-semibold">Hollister</span>
                        <span className="block text-[10px] font-light ml-2">Fashion & Fitness</span>
                    </div>
                    <img className="ml-auto mr-[4%] h-[10%] w-[10%]" src="/images/assets/screenzome.svg" />
                </div>
                <div className="absolute bottom-0 w-[100%] h-[30%] bg-gradient-to-t from-black opacity-80 z-10 invisible transform transition duration-500 group-hover/item:visible"></div>
            </div>
        </div>
    );
}


export default Screen;