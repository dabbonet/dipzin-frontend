import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Screen from "../../components/screen";

type ShowcaseProps = {
    selectedId: number;
    setSelectedId: () => void;
}


const Showcase = ({ selectedId, setSelectedId }: ShowcaseProps) => {
    const toStorageUrl = (pathname: string) => process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/application/' + pathname

    const { data } = useQuery(['stream'])
    const [appData, setAppData] = useState(null)


    useEffect(() => {
        if (data) {
            const selectedData = data?.pages[0].data.find(item => item.id === selectedId)
            setAppData(selectedData)
        }
    }, [data, selectedId])


    return (
        <motion.div
            onClick={() => setSelectedId(null)}
            layoutId={selectedId?.toString()}
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
                        src={toStorageUrl("icons/" + appData?.icon)}
                    />
                    <div className="ml-4">
                        <span className="text-[32px] font-medium">{appData?.name}</span>
                        <span className="block text-[16px] text-[#8F94A1]">
                            {appData?.tagline}
                        </span>
                    </div>
                </div>
                <div className="grid lg:grid-cols-5 lg:gap-10 gap-10 grid-cols-2 ml-auto mr-auto z-50">
                    {appData?.showcase?.map((item, index) => (
                        <Screen key={index} platform={1} src={toStorageUrl("/screens/" + appData.id + "/" + item)} />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Showcase