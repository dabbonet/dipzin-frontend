import { motion } from 'framer-motion'
import Image from 'next/image'
import { FC } from 'react'
import { cn, rgbDataURL } from '@/lib/utils'
import SingleScreen from './screen/SingleScreen'
import { usePlatform } from '@/lib/platforms'
import Icons from './Icons'
import { ImageDownloader } from '@/lib/ImageDownloader'
import { toast } from 'react-hot-toast'
import { ActionBar, SquareButton } from './ActionBar'
import { useRouter } from 'next/navigation'

interface ShowcaseProps {
  selectedShowcase: any;
  setSelectedShowcase: any;
}

const Showcase: FC<ShowcaseProps> = ({
  selectedShowcase,
  setSelectedShowcase,
}) => {
  const router = useRouter();
  const { selected: platform } = usePlatform();

  return (
    <motion.div
      //layoutId={selected.id}
      className={"w-[100%] h-[100%] z-50 fixed inset-0 overflow-y-scroll py-16 xl:py-28 backdrop-blur-lg bg-slate-900/70"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className={"flex flex-col w-[80%] lg:w-[80%] mx-auto"}>
        <div className="flex my-8 items-center justify-between text-white z-50">
          <div className="flex items-center">
            <Image
              className="ml-3 rounded-2xl bg-slate-700"
              width={56}
              height={56}
              placeholder="blur"
              blurDataURL={rgbDataURL(30, 41, 59)}
              src={selectedShowcase?.icon}
              alt="icon"
            />
            <div className="ml-4">
              <span className="text-[32px] font-medium">{selectedShowcase?.name}</span>
              <span className="block text-[16px] text-[#8F94A1]">
                {selectedShowcase?.tag_line}
              </span>
            </div>
          </div>
          <ActionBar className='flex space-x-1.5'>
            <SquareButton className='w-32' onClick={() => router.push("/app/" + getPlatformById(selectedShowcase.platform) + "/" + selectedShowcase.slug)}>
              <SquareButton.Title className='w-[70%]'>Open Application</SquareButton.Title>
              <SquareButton.Icon>
                <Icons.Open />
              </SquareButton.Icon>
            </SquareButton>

            {selectedShowcase.store_link && (
              <SquareButton
                onClick={() => {
                  window.open(
                    selectedShowcase.store_link,
                    "_blank",
                    "noreferrer"
                  );
                }}
              >
                <SquareButton.Title className="w-[70%]">
                  App Store
                </SquareButton.Title>
                <SquareButton.Icon>
                  <Icons.Apple />
                </SquareButton.Icon>
              </SquareButton>
            )}

            {/* TODO: Add Save When Collections is Done. */}
            {/* <SquareButton
                            onClick={() => {

                            }}
                        >
                            <SquareButton.Title>Save</SquareButton.Title>
                            <SquareButton.Icon>
                                <Icons.Save />
                            </SquareButton.Icon>
                        </SquareButton> */}

            <SquareButton
              className='w-28'
              onClick={() => {
                ImageDownloader(selectedShowcase.name + ' Showcase', selectedShowcase.screens)
              }}
            >
              <SquareButton.Title>Download Showcase</SquareButton.Title>
              <SquareButton.Icon>
                <Icons.Download />
              </SquareButton.Icon>
            </SquareButton>

            <SquareButton
              onClick={() => {
                navigator.clipboard.writeText(
                  window.location.origin +
                  "/app/" +
                  getPlatformById(selectedShowcase.platform) +
                  "/" +
                  selectedShowcase.slug //need fix
                );
                toast.success("App Link Copied.");
              }}
            >
              <SquareButton.Title className="w-[70%]">
                Copy Link
              </SquareButton.Title>
              <SquareButton.Icon>
                <Icons.CopyFilled />
              </SquareButton.Icon>
            </SquareButton>

            <SquareButton
              className='w-24'
              onClick={() => setSelectedShowcase(null)}
            >
              <SquareButton.Title className='w-[70%]'>Close Showcase</SquareButton.Title>
              <SquareButton.Icon>
                <Icons.XCircle />
              </SquareButton.Icon>
            </SquareButton>

          </ActionBar>
        </div>
        {/*-------------------------------------------------------*/}
        <div
          className={cn("grid ml-auto mr-auto z-50 w-full", platform === 3 ? "grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-10 " : "grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10")}
        >
          {selectedShowcase?.screens.map((item: any, index: number) => (
            <SingleScreen key={index} screen={item} />
          ))}
        </div>

      </motion.div>
      <motion.div
        onClick={() => setSelectedShowcase(null)}
        className={
          "w-[100%] h-[100%] fixed top-0 bg-transparent"
        }
      ></motion.div>
    </motion.div>
  )
}

export default Showcase

const getPlatformById = (platform_id: any) => {
  let platform;
  switch (platform_id) {
    case "1":
      platform = "android";
      break;
    case "2":
      platform = "ios";
      break;
    case "3":
      platform = "web";
      break;
  }
  return platform;
};
