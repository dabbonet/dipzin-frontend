"use client";
import Icons from "@/components/icons/Icons";
import { usePlatform } from "@/context/usePlatforms";
import { cn } from "@/lib/utils";

export default function StreamLoader() {
  const { selected } = usePlatform();
  const rowHeight = selected === 3 ? "20rem" : "38rem";
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div
      className={cn(
        "grid content-center gap-6 pt-0 my-4 relative animate-pulse",
        selected === 3
          ? "2xl:grid-cols-3 md:grid-cols-3"
          : " 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3"
      )}
      style={{ gridAutoRows: rowHeight }}
    >
      {/* <div className="absolute top-0 left-0 rounded-2xl z-10 bg-gradient-to-b from-slate-900/5 to-slate-900/60 w-full h-full"></div> */}
      <div
        className={cn(
          "bg-slate-900/60 backdrop-blur-2xl col-span-1 rounded-3xl flex justify-center items-center w-full h-full"
        )}
      >
        <Icons.Image className="text-slate-800 h-16 w-16" />
      </div>
      <div
        className={cn(
          "bg-slate-900/60 backdrop-blur-2xl col-span-1 rounded-3xl flex justify-center items-center w-full h-full"
        )}
      >
        <Icons.Image className="text-slate-800 h-16 w-16" />
      </div>
      <div
        className={cn(
          "bg-slate-900/60 backdrop-blur-2xl col-span-1 rounded-3xl flex justify-center items-center w-full h-full"
        )}
      >
        <Icons.Image className="text-slate-800 h-16 w-16" />
      </div>
      <div
        className={cn(
          "bg-slate-900/60 backdrop-blur-2xl col-span-1 rounded-3xl flex justify-center items-center w-full h-full"
        )}
      >
        <Icons.Image className="text-slate-800 h-16 w-16" />
      </div>
      <div
        className={cn(
          "bg-slate-900/60 backdrop-blur-2xl col-span-1 rounded-3xl flex justify-center items-center w-full h-full"
        )}
      >
        <Icons.Image className="text-slate-800 h-16 w-16" />
      </div>
      <div
        className={cn(
          "bg-slate-900/60 backdrop-blur-2xl col-span-1 rounded-3xl flex justify-center items-center w-full h-full"
        )}
      >
        <Icons.Image className="text-slate-800 h-16 w-16" />
      </div>
      <div
        className={cn(
          "bg-slate-900/60 backdrop-blur-2xl col-span-1 rounded-3xl flex justify-center items-center w-full h-full"
        )}
      >
        <Icons.Image className="text-slate-800 h-16 w-16" />
      </div>
      <div
        className={cn(
          "bg-slate-900/60 backdrop-blur-2xl col-span-1 rounded-3xl flex justify-center items-center w-full h-full"
        )}
      >
        <Icons.Image className="text-slate-800 h-16 w-16" />
      </div>
      <div
        className={cn(
          "bg-slate-900/60 backdrop-blur-2xl col-span-1 rounded-3xl flex justify-center items-center w-full h-full"
        )}
      >
        <Icons.Image className="text-slate-800 h-16 w-16" />
      </div>
    </div>
  );
}
