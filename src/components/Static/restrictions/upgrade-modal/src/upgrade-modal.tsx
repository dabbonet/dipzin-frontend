import Image from "next/image"
import {
  Card, CardContent, CardFooter
} from "@/components/UI/card";
import { Icon } from "@/components/UI/icon";
import { Button } from "@/components/Shared/button";

const listItemsData = [
  "Unlimited Search and Filters",
  "Unlimited Collections",
  "Bulk Downloads",
  "Prioritized Support",
];

const ListItem = ({ item }: { item:string }) => (
  <div className="flex items-center gap-2 whitespace-nowrap ">
    <Icon.Check className="size-6" />
    <p className="text-sm font-medium">{item}</p>
  </div>
);

const UpgradeAdDialog = () => (
  <Card className="bg-slate-900 w-[790px] h-[660px] border-0 rounded-[26px]   text-white">
    {/* image */}

    <Image
      src="/assets/banner.svg"
      width={790}
      height={240}
      alt="Banner"
    />

    <CardContent className="p-10 space-y-6">
      <div className="space-y-2">
        <h3 className="text-slate-200 text-[32px] font-medium">
          Upgrade and get access to exclusive features
        </h3>
        <p className="text-slate-300 text-lg">
          To Continue using your free trial of our premium features, please upgrade to our premium package.
        </p>
      </div>
      <div className="p-4 bg-slate-800 rounded-3xl flex items-center justify-between">
        {/* price */}
        <div className="p-3 bg-slate-900 border border-aqua-400 rounded-2xl">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs text-slate-300">Starts at</p>
            <strong className="text-white font-medium sm:text-[28px] text-lg leading-10">$ 6 /mo</strong>
            <p className="text-xs text-slate-300">billed at $72/yr </p>
          </div>
        </div>
        {/* features */}
        <div className="flex flex-col sm:grid sm:grid-cols-1 sm:md:grid-cols-2 sm:gap-x-10 gap-y-3">
          {listItemsData.map((item) => (
            <ListItem key={item} item={item} />
          ))}
        </div>
      </div>
    </CardContent>

    <CardFooter className="flex sm:flex-row flex-col justify-between items-center sm:px-10 sm:mb-8">
      <button type="button" className="text-[#C9FFED] text-sm">
        Invite to Dipzin 💰
      </button>
      <div className="flex items-center gap-8">
        {/* <Link href="/pricing" className="text-[#C9FFED] text-sm py-2 sm:px-12 px-4 bg-transparent border-solid border sm-[#C9FFED] rounded-lg">Unlock More!</Link> */}
        <Button variant="darkGray">
          Unlock More
        </Button>
        <Button>
          Press & Hold to Close
        </Button>
        {/* <CloseButton /> */}
      </div>
    </CardFooter>
  </Card>
);

export default UpgradeAdDialog
