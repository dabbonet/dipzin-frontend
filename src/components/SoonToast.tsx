import { FC } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const SoonToast: FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className='bg-orange-500 flex pl-2 pr-8 py-2 rounded-full space-x-3'
        >
            <div className='bg-orange-400 p-2 rounded-full'>
                <Image
                    src="/images/assets/dropping.svg"
                    title="Dropping Soon"
                    alt=""
                    width={32}
                    height={32}
                    unoptimized
                />
            </div>
            <div className='-space-y-1 tracking-wider'>
                <h2 className='font-semibold text-orange-100'>Feature Dropping Soon, Stay Tuned!</h2>
                <p className='font-light text-orange-100'>We're still working on this feature, will be worth the wait.</p>
            </div>
        </motion.div>
    )
}

export default SoonToast