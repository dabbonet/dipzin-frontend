import { IphoneImage } from "@/components/Account/iphone-image";
import { Logo } from "@/components/UI/logo";

export default function AccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const images = [
    "https://dipzin-com.s3.us-east-1.amazonaws.com/7aa1159c_c964_46b6_865b_82b9ba01c9dc_d639872f00.png",
    "https://dipzin-com.s3.us-east-1.amazonaws.com/20b77185_e72b_4a8a_8b8b_a0f6a6900276_b01bcce49c.png",
    "https://dipzin-com.s3.us-east-1.amazonaws.com/2d3d6209_40e6_4371_9e1b_e41e56309fe9_895c395e64.png",
    "https://dipzin-com.s3.us-east-1.amazonaws.com/e1fa7be8_6158_4360_b123_8c36ec372e08_27e617feb5.png",
    "https://dipzin-com.s3.us-east-1.amazonaws.com/0d0da468_3121_48c1_bb8d_7575bb36062d_60a7ab53c5.png",
  ];

  return (
    <main className="flex flex-col md:flex-row w-screen h-screen justify-center items-center relative gap-1">
      <div className="flex-[0.55] lg:flex-none bg-transparent md:bg-black-950/50 z-10 flex flex-col items-start justify-center px-4 pt-5 md:px-8 md:pt-7 rounded-3xl w-full h-fit md:w-[40rem] md:h-[30rem] md:rounded-r-none ">
        <a className="flex sm:hidden" href="/" aria-label="Home">
          <Logo.Dipzin className="text-white" />
        </a>
        <div className="flex size-full flex-col sm:w-full items-center justify-center rounded-[20px] text-white">
          {children}
        </div>
      </div>
      <div className="flex-[0.45] lg:flex-none size-fit flex items-start justify-center relative overflow-hidden">
        <IphoneImage images={images} />
      </div>
    </main>
  );
}
