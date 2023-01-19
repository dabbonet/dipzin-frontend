import { motion } from 'framer-motion'
import { Key, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Screen from "../../components/screen";

type ShowcaseProps = {
    selected: any;
    setSelected: any;
}


const Showcase = ({ selected, setSelected }: ShowcaseProps) => {
    const toStorageUrl = (pathname: string) => process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/application/' + pathname

    // const { data } = useQuery(['stream'])
    // const [appData, setAppData] = useState(null)


    // useEffect(() => {
    //     // const onScroll = async (event) => {
    //     //     event.preventDefault()
    //     // }
    //     // if (selected) {
    //     //     const selectedData = data?.pages.flatMap(page => page.data).find(item => item.id === selectedId)
    //     //     setAppData(selectedData)
    //     // }
    // }, [appData, selected])


    return (
        <motion.div
            onClick={() => setSelected()}
            layoutId={selected?.toString()}
            className={'w-[100%] h-[100%] z-40 fixed overflow-y-scroll pt-40 backdrop-blur-lg bg-slate-900/70'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className={'duration-1000 transition-all flex flex-col w-[80%] lg:w-[75%] mx-auto'}
            >
                <div className="flex my-8 items-center text-white z-50">
                    <img
                        className="h-[48px] rounded-2xl bg-slate-500"
                        src={toStorageUrl("icons/" + selected?.icon)}
                    />
                    <div className="ml-4">
                        <span className="text-[32px] font-medium">{selected?.name}</span>
                        <span className="block text-[16px] text-[#8F94A1]">
                            {selected?.tagline}
                        </span>
                    </div>
                </div>
                <div className="grid lg:grid-cols-5 lg:gap-10 gap-10 grid-cols-2 ml-auto mr-auto z-50">
                    {selected?.showcase?.map((item: string, index: Key | null | undefined) => (
                        <Screen key={index} platform={1} src={toStorageUrl("/screens/" + selected.id + "/" + item)} />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Showcase