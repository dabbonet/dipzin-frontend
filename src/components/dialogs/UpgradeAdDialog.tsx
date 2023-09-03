// import { useState} from "react"
// import { motion, AnimatePresence } from "framer-motion";
// import { useDialog } from "@/context/useDialog";
// import InviteDialog from "./InviteDialog";
// import Link from "next/link";
// import { useResponsive } from "@/context/useResponsive";

// function formatTime(seconds: number): string {
//   const secs = (seconds % 60).toString().padStart(2, '0');
//   return `${secs}s`;
// }


// const UpgradeAdDialog = ({ title }) => {
//   const baseCounter = 5;
//   const [counter, setCounter] = useState<number>(baseCounter)
//   const {hideDialog} = useDialog();
//   const [showInviteDialog, setShowInviteDialog] = useState(false);
//   const {isMobile} = useResponsive();
  
//   let timer;
//   let timeInMillSeconds = 1000  

//   const onPressButton = () => {
//     timer = setTimeout(() => {
//       if (timeInMillSeconds === 1000) {
//         const baseCounter = 5
//         setCounter(baseCounter)
//         hideDialog()
//         return clearTimeout(timer)
//       }
//     }, 1000)
//   }

//   const onLeaveButton = () => {
//     clearTimeout(timer)
//   }

//   const CloseButton = () => {
//     if (counter === 0) {
//       return <button
//         className=" button-trans"
//         onMouseDown={onPressButton}
//         onMouseUp={onLeaveButton}
//       >
//         Press & Hold to Close
//       </button>
//     }
//     return <button
//       className=' bg-gradient-to-tr text-slate-800 from-[#14F3C5] to-[#00B390] pointer-events-none rounded-lg py-2 px-12'
//     >
//       Continue in {formatTime(counter)}
//     </button>
//   }

//   const onShowIviteDialog = () => {
//     const baseCounter = 5
//     setCounter(baseCounter)
//     setShowInviteDialog(true);  // Add this to show the invite dialog
//   }

//   if (showInviteDialog) {
//     return <InviteDialog />
//   }

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         exit={{ opacity: 0 }}
//       >

//   <div className="w-[100%] h-[100%] p-3 fixed inset-0 bg-opacity-50 bg-[#0D1018] backdrop-blur-xl sm:flex sm:justify-center sm:items-center z-[100]">
//     <div className="max-w-3xl bg-slate-900 rounded-3xl flex flex-col gap-y-4 sm:gap-5">
//       {/* image */}
//       {isMobile&&<img
//        src="/images/assets/smallPanner.svg"
//        className="sm:rounded-2xl"
//        alt=""/>} 

//       {!isMobile&&<img
//         src="/images/assets/banner.png"
//         className="sm:rounded-2xl"
//         alt=""
//       />}
//       {/* header */}
//       <div className="sm:px-10 px-8">
//         <h3 className="text-slate-200 sm:text-2xl text-xl font-medium mb-2">
//           {title || 'Upgrade and get access to exclusive features'}
//         </h3>
//         <p className="text-slate-300 text-sm sm:text-base">To Continue using your free trial of our premium features, please upgrade to our premium package.</p>
//       </div>
//       {/* features and price */}
//       <div className="p-4 mx-10 sm:flex bg-slate-800 rounded-2xl sm:items-center gap-x-9 sm:flex-row">
//         {/* price */}
//         <div className="bg-[#37FFCF] rounded-xl sm:py-2 py-1 sm:px-4 px-3 w-fit">
//           <div className="w-fit flex flex-col items-center" >
//             <p className="text-xs text-[#007160] font-medium">Starts at</p>
//             <strong className="text-[#00342E] font-medium sm:text-2xl text-lg">$ 6 /mo</strong>
//             <p className="text-xs text-[#007160] font-medium">billed at $72/yr </p>
//           </div>
//         </div>
//         {/* features */}
//         <div className="flex flex-col mt-3 sm:grid sm:grid-cols-1 sm:md:grid-cols-2 sm:gap-x-6 gap-y-3">
          
//           <div className="flex items-center gap-2 whitespace-nowrap">
//             <img src="/images/assets/check-new-branding.svg" alt="" />
//             <p className="text-xs">Unlimited Search and Filters</p>
//           </div>
//           <div className="flex items-center gap-2 whitespace-nowrap">
//             <img src="/images/assets/check-new-branding.svg" alt="" />
//             <p className="text-xs">Unlimited Collections</p>
//           </div>
//           <div className="flex items-center gap-2 whitespace-nowrap">
//             <img src="/images/assets/check-new-branding.svg" alt="" />
//             <p className="text-xs">Bulk Downloads</p>
//           </div>
//           <div className="flex items-center gap-2 whitespace-nowrap">
//             <img src="/images/assets/check-new-branding.svg" alt="" />
//             <p className="text-xs">Prioritized Support</p>
//           </div>
//         </div>
//       </div>

//       <div className="flex sm:flex-row flex-col justify-between items-center sm:px-10 sm:mb-8">
//         <div className="flex gap-x-4">
//           <Link href='/pricing' className="text-[#C9FFED] text-sm py-2 sm:px-12 px-4 bg-transparent border-solid border sm-[#C9FFED] rounded-lg">Unlock More!</Link>
//           <CloseButton />
//         </div>
//         <div className="flex space-x-4 my-4">
//           <button onClick={onShowIviteDialog} className="text-[#C9FFED] text-sm">
//             Invite to Dipzin 💰
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
//       </motion.div>
//     </AnimatePresence>
//   ) 
// };

// export default UpgradeAdDialog