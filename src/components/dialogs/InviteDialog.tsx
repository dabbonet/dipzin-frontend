// 'use client'
// import { useState } from "react";
// // import { useDialog } from "@/context/useDialog";

// const InviteDialog = () => {
//   const [inputData] = useState('https://dipzin.com/referra3/username')
//   const copyInputData = () => {
//     navigator.clipboard.writeText(inputData)
//   }
//   return <div className="w-[100%] h-[100%] fixed inset-0 bg-opacity-50 bg-[#0D1018] backdrop-blur-xl  flex justify-center items-center z-50">
//     <div className="max-w-3xl bg-slate-900 rounded-3xl  flex flex-col gap-5 px-32 py-10 items-center ">
//       {/* image */}
//       <img src="/images/assets/frame-2500.svg" alt="" className=" w-40 h-40" />
//       <div className=" flex flex-col items-center mb-4">
//         <h1 className=" text-slate-200 text-4xl font-medium mb-2">Invite and get <span className=" text-[#14F3C5]">$20</span> discount</h1>
//         <p className=" text-slate-300 text-base text-center">To Continue using your free trial of our premium features, please upgrade to our premium package.</p>
//       </div>
//       <div className=" w-full relative">
//         <input type="text" value={inputData} className=" w-full py-3 px-4 rounded-lg text-sm bg-slate-800 text-[#C9FFED] border border-solid border-[#475569]" />
//         <input onClick={copyInputData} type="submit" value='copy' className="text-[#00342E] bg-gradient-to-tr from-[#14F3C5] to-[#00B390] py-1 px-3 rounded-md absolute top-[6px] right-2 cursor-pointer" />
//       </div>
//       <div className=" w-1/2 ml-auto flex justify-between items-center mt-9">
//         <button 
//           className=" text-[#C9FFED]" 
//         // onClick={skipDialog}
//         >skip</button>
//         <span>or social share</span>
//       </div>
//     </div>
//   </div>
// }

// export default InviteDialog