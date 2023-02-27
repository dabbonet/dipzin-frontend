import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import BlurImage from "../../screen/Image"
import { useEffect, useState } from "react"
import { supabase } from "../../../lib/supabase"
import { toStorageUrl } from "../../helpers"

const Search = ({search}: any) => {

    const [results, setResults] = useState<any>([]);
    const [selected, setSelected] = useState<any>({});

    useEffect(() => {
        const handleSearch = async () => {
          let threshold = 0.25;
          let { data, error } = await supabase.rpc('search_dipzin', {
            search_term: search,
            similarity_threshold: threshold
          });
          
          if (data && data.length < 4 && !error) {
            threshold = 0.2;
            ({ data, error } = await supabase.rpc('search_dipzin', {
              search_term: search,
              similarity_threshold: threshold
            }));
          }
          
          if (error) {
            console.log(error);
          } else {
            setResults(data);
            // console.log(data);
          }
        }
        
        handleSearch();
        // console.log('results', results)
      }, [search]);

  return (
    <motion.div 
        className="mb-2 p-2 max-w-[1400px]"
        initial={{ opacity: 0, y:200 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ type: "spring", duration: 1 }}
        >
        <p className='uppercase text-sm text-slate-400'>Search Results</p>
        <div className='flex space-x-4 mt-2 max-h-[500px]'>
            <div className='w-[30%] px-2 py-2  flex-col rounded-2xl bg-slate-800 scroll-py-2 snap-y scroll-smooth overflow-y-scroll scrollbar-hide'>
                {results.map((result: any) => (
                    <>
                        <motion.div 
                            key={result.id} 
                            className='flex items-center p-2 hover:bg-slate-900 rounded-xl space-x-3'
                            onHoverStart={() => setSelected(result)}
                        >
                            {result.platform && (
                                <Image
                                    className="rounded-2xl bg-slate-700"
                                    width={48}
                                    height={48}
                                    src={toStorageUrl("icons/" + result.icon)}
                                    alt="icon"
                                />
                            )}
                            {result.pattern && (
                                <div className="rounded-xl w-[48px] h-[48px] flex items-center justify-center bg-slate-700">
                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 relative"
                                        preserveAspectRatio="xMidYMid meet"
                                    >
                                    <g clip-path="url(#clip0_1564_63289)">
                                        <path
                                            opacity="0.4"
                                            d="M18.6594 6.19338H15.8398C16.0838 6.57972 16.2256 7.03665 16.2256 7.52636C16.2256 7.56915 16.2427 7.61017 16.2729 7.64042C16.3032 7.67068 16.3442 7.6877 16.387 7.68775H19.9923C20.0642 6.89888 19.4638 6.18858 18.6594 6.19338Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M15.0571 7.52629C15.0571 6.79014 14.4603 6.19336 13.7241 6.19336H10.1181C9.38194 6.19336 8.78516 6.79014 8.78516 7.52629V18.6637C8.78516 19.3998 9.38194 19.9966 10.1181 19.9966H18.6625C19.3986 19.9966 19.9954 19.3998 19.9954 18.6637V8.85926H16.39C15.6539 8.85926 15.0571 8.26248 15.0571 7.52629ZM16.8999 17.4869H11.8806C11.5571 17.4869 11.2948 17.2247 11.2948 16.9012C11.2948 16.5777 11.5571 16.3154 11.8806 16.3154H16.8999C17.6748 16.3435 17.6772 17.4579 16.8999 17.4869ZM17.4857 10.627V14.3915C17.4857 14.715 17.2234 14.9772 16.8999 14.9772H11.8806C11.5571 14.9772 11.2948 14.715 11.2948 14.3915V10.627C11.2948 10.3035 11.5571 10.0412 11.8806 10.0412H16.8999C17.2235 10.0412 17.4857 10.3035 17.4857 10.627Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            opacity="0.4"
                                            d="M12.4662 11.2122H16.314V13.8052H12.4662V11.2122ZM18.6623 0.00197735H16.1144C16.3583 0.38831 16.5001 0.845248 16.5001 1.33495C16.5002 1.37774 16.5172 1.41876 16.5475 1.44902C16.5777 1.47927 16.6187 1.4963 16.6615 1.49635H19.9953C20.0671 0.707475 19.4667 -0.00282594 18.6623 0.00197735ZM11.9969 1.49635H15.3387C15.3812 0.707085 14.8116 -0.00251353 13.9956 0.0020164H11.4498C11.6937 0.388349 11.8355 0.845287 11.8355 1.33499C11.8356 1.37778 11.8526 1.4188 11.8828 1.44905C11.9131 1.47931 11.9541 1.49632 11.9969 1.49635ZM7.33226 1.49635H10.674C10.7165 0.707085 10.147 -0.00251353 9.33098 0.0020164H6.78516C7.02907 0.388349 7.17086 0.845248 7.17086 1.33495C7.17092 1.37774 7.18794 1.41876 7.21819 1.44902C7.24845 1.47927 7.28947 1.4963 7.33226 1.49635Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M5.99825 1.33489C5.99825 0.598733 5.40147 0.00195312 4.66532 0.00195312H1.33293C0.596779 0.00195313 0 0.598733 0 1.33489V16.1535C0 16.8897 0.596779 17.4864 1.33293 17.4864H7.61235V12.4671H3.09547C2.77197 12.4671 2.5097 12.2048 2.5097 11.8813C2.5097 11.5578 2.77197 11.2955 3.09547 11.2955H7.61239V9.95738H3.09547C2.77197 9.95738 2.5097 9.69511 2.5097 9.37161V5.60708C2.5097 5.28358 2.77197 5.02131 3.09547 5.02131H18.6612C19.1509 5.02131 19.6078 5.16311 19.9942 5.40702V2.66786H7.33119C6.59503 2.66786 5.99825 2.07108 5.99825 1.33489ZM3.09547 13.8052H6.86C7.63516 13.8335 7.63692 14.9478 6.86 14.9768H3.09547C2.77197 14.9768 2.5097 14.7145 2.5097 14.391C2.5097 14.0675 2.77193 13.8052 3.09547 13.8052Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            opacity="0.4"
                                            d="M3.67969 8.78639H7.61085V7.52629C7.61085 7.03663 7.75264 6.57969 7.99656 6.19336H3.67969V8.78639Z"
                                            fill="currentColor"
                                        />
                                    </g>
                                    </svg>
                                </div>
                            )}
                            {result.category && (
                                <div className="rounded-xl w-[48px] h-[48px] flex items-center justify-center bg-slate-700">
                                   <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 relative"
                                        preserveAspectRatio="xMidYMid meet"
                                    >
                                    <g clip-path="url(#clip0_1564_63302)">
                                        <path
                                        opacity="0.4"
                                        d="M23.6858 15.2109L22.9799 14.7422L13.1667 21.2572C12.8198 21.4875 12.4164 21.6092 12 21.6092C11.5837 21.6092 11.1803 21.4875 10.8334 21.2573L1.02021 14.7422L0.314227 15.2109C-0.104742 15.4891 -0.104742 16.1044 0.314227 16.3825L11.6111 23.8825C11.7264 23.959 11.8616 23.9998 12 23.9998C12.1384 23.9998 12.2736 23.959 12.3889 23.8825L23.6858 16.3825C24.1047 16.1043 24.1047 15.489 23.6858 15.2109Z"
                                        fill="currentColor"
                                        />
                                        <path
                                        opacity="0.4"
                                        d="M23.6858 11.414L22.9798 10.9453L13.1667 17.4603C12.8198 17.6906 12.4164 17.8124 12 17.8124C11.5836 17.8124 11.1801 17.6906 10.8333 17.4603L1.02016 10.9454L0.314227 11.414C-0.104742 11.6922 -0.104742 12.3075 0.314227 12.5856L11.6111 20.0856C11.7264 20.1621 11.8616 20.2029 12 20.2029C12.1384 20.2029 12.2736 20.1621 12.3889 20.0856L23.6858 12.5856C24.1047 12.3075 24.1047 11.6922 23.6858 11.414Z"
                                        fill="currentColor"
                                        />
                                        <path
                                        d="M0.314227 8.7889L11.6111 16.2889C11.7264 16.3654 11.8616 16.4062 12 16.4062C12.1384 16.4062 12.2736 16.3654 12.3889 16.2889L23.6858 8.7889C24.1047 8.51074 24.1047 7.89551 23.6858 7.61735L12.3889 0.11735C12.2736 0.040821 12.1384 0 12 0C11.8616 0 11.7264 0.040821 11.6111 0.11735L0.314227 7.61735C-0.104742 7.89546 -0.104742 8.51074 0.314227 8.7889ZM15.6212 10.701C15.4064 11.0245 14.97 11.1126 14.6465 10.8979L12 9.14084L9.35346 10.8979C9.02993 11.1126 8.59357 11.0245 8.37879 10.701C8.16401 10.3774 8.25213 9.94108 8.57566 9.7263L11.6111 7.7111C11.7264 7.63457 11.8616 7.59375 12 7.59375C12.1384 7.59375 12.2736 7.63457 12.3889 7.7111L15.4243 9.7263C15.7478 9.94108 15.8359 10.3774 15.6212 10.701ZM5.7162 7.82782L11.6111 3.91423C11.7263 3.8377 11.8616 3.79688 12 3.79688C12.1383 3.79688 12.2736 3.8377 12.3889 3.91423L18.2837 7.82782C18.6072 8.0426 18.6954 8.47896 18.4806 8.80249C18.2658 9.12602 17.8294 9.21415 17.5059 8.99937L12 5.34396L6.49399 8.99937C6.17046 9.21415 5.7341 9.12598 5.51932 8.80249C5.30454 8.47901 5.39271 8.0426 5.7162 7.82782Z"
                                        fill="currentColor"
                                        />
                                    </g>
                                    </svg>
                                </div>
                            )}

                            <div className="text-white">
                                <span className="text-[15px] font-semibold">{result.name}</span>
                                <span className="block text-[10px] font-light">
                                    {result.platform && (
                                        <span className="block text-[10px] font-light">{result.tagline}</span>
                                    )}
                                    {result.pattern && (
                                        <span className="block text-[10px] font-light">Filter by <b className="font-semibold">Screen Pattern</b></span>
                                    )}
                                    {result.category && (
                                        <span className="block text-[10px] font-light">Filter by <b className="font-semibold">App Category</b></span>
                                    )}
                                    
                                </span>
                            </div>
                        </motion.div>
                    </>
                ))}
            </div>
            <PreviewCard selected={selected} />
        </div>
    </motion.div>
  )
}

export default Search




const PreviewCard = ({ selected }: any) => {

    
    return (
      <div className='w-[70%] p-2 rounded-2xl bg-slate-800'>
  
          {/* Header Area */}
          <div className='w-full flex justify-between'>
              <div className='flex items-center p-2 rounded-xl space-x-3' >
                {selected.platform && (
                    <Image
                        className="rounded-2xl bg-slate-700"
                        width={48}
                        height={48}
                        src={toStorageUrl("icons/" + selected.icon)}
                        alt="icon"
                    />
                )}
                {selected.pattern && (
                    <div className="rounded-xl w-[48px] h-[48px] flex items-center justify-center bg-slate-700">
                        <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 relative"
                            preserveAspectRatio="xMidYMid meet"
                        >
                        <g clip-path="url(#clip0_1564_63289)">
                            <path
                                opacity="0.4"
                                d="M18.6594 6.19338H15.8398C16.0838 6.57972 16.2256 7.03665 16.2256 7.52636C16.2256 7.56915 16.2427 7.61017 16.2729 7.64042C16.3032 7.67068 16.3442 7.6877 16.387 7.68775H19.9923C20.0642 6.89888 19.4638 6.18858 18.6594 6.19338Z"
                                fill="currentColor"
                            />
                            <path
                                d="M15.0571 7.52629C15.0571 6.79014 14.4603 6.19336 13.7241 6.19336H10.1181C9.38194 6.19336 8.78516 6.79014 8.78516 7.52629V18.6637C8.78516 19.3998 9.38194 19.9966 10.1181 19.9966H18.6625C19.3986 19.9966 19.9954 19.3998 19.9954 18.6637V8.85926H16.39C15.6539 8.85926 15.0571 8.26248 15.0571 7.52629ZM16.8999 17.4869H11.8806C11.5571 17.4869 11.2948 17.2247 11.2948 16.9012C11.2948 16.5777 11.5571 16.3154 11.8806 16.3154H16.8999C17.6748 16.3435 17.6772 17.4579 16.8999 17.4869ZM17.4857 10.627V14.3915C17.4857 14.715 17.2234 14.9772 16.8999 14.9772H11.8806C11.5571 14.9772 11.2948 14.715 11.2948 14.3915V10.627C11.2948 10.3035 11.5571 10.0412 11.8806 10.0412H16.8999C17.2235 10.0412 17.4857 10.3035 17.4857 10.627Z"
                                fill="currentColor"
                            />
                            <path
                                opacity="0.4"
                                d="M12.4662 11.2122H16.314V13.8052H12.4662V11.2122ZM18.6623 0.00197735H16.1144C16.3583 0.38831 16.5001 0.845248 16.5001 1.33495C16.5002 1.37774 16.5172 1.41876 16.5475 1.44902C16.5777 1.47927 16.6187 1.4963 16.6615 1.49635H19.9953C20.0671 0.707475 19.4667 -0.00282594 18.6623 0.00197735ZM11.9969 1.49635H15.3387C15.3812 0.707085 14.8116 -0.00251353 13.9956 0.0020164H11.4498C11.6937 0.388349 11.8355 0.845287 11.8355 1.33499C11.8356 1.37778 11.8526 1.4188 11.8828 1.44905C11.9131 1.47931 11.9541 1.49632 11.9969 1.49635ZM7.33226 1.49635H10.674C10.7165 0.707085 10.147 -0.00251353 9.33098 0.0020164H6.78516C7.02907 0.388349 7.17086 0.845248 7.17086 1.33495C7.17092 1.37774 7.18794 1.41876 7.21819 1.44902C7.24845 1.47927 7.28947 1.4963 7.33226 1.49635Z"
                                fill="currentColor"
                            />
                            <path
                                d="M5.99825 1.33489C5.99825 0.598733 5.40147 0.00195312 4.66532 0.00195312H1.33293C0.596779 0.00195313 0 0.598733 0 1.33489V16.1535C0 16.8897 0.596779 17.4864 1.33293 17.4864H7.61235V12.4671H3.09547C2.77197 12.4671 2.5097 12.2048 2.5097 11.8813C2.5097 11.5578 2.77197 11.2955 3.09547 11.2955H7.61239V9.95738H3.09547C2.77197 9.95738 2.5097 9.69511 2.5097 9.37161V5.60708C2.5097 5.28358 2.77197 5.02131 3.09547 5.02131H18.6612C19.1509 5.02131 19.6078 5.16311 19.9942 5.40702V2.66786H7.33119C6.59503 2.66786 5.99825 2.07108 5.99825 1.33489ZM3.09547 13.8052H6.86C7.63516 13.8335 7.63692 14.9478 6.86 14.9768H3.09547C2.77197 14.9768 2.5097 14.7145 2.5097 14.391C2.5097 14.0675 2.77193 13.8052 3.09547 13.8052Z"
                                fill="currentColor"
                            />
                            <path
                                opacity="0.4"
                                d="M3.67969 8.78639H7.61085V7.52629C7.61085 7.03663 7.75264 6.57969 7.99656 6.19336H3.67969V8.78639Z"
                                fill="currentColor"
                            />
                        </g>
                        </svg>
                    </div>
                )}
                {selected.category && (
                    <div className="rounded-xl w-[48px] h-[48px] flex items-center justify-center bg-slate-700">
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 relative"
                            preserveAspectRatio="xMidYMid meet"
                        >
                        <g clip-path="url(#clip0_1564_63302)">
                            <path
                            opacity="0.4"
                            d="M23.6858 15.2109L22.9799 14.7422L13.1667 21.2572C12.8198 21.4875 12.4164 21.6092 12 21.6092C11.5837 21.6092 11.1803 21.4875 10.8334 21.2573L1.02021 14.7422L0.314227 15.2109C-0.104742 15.4891 -0.104742 16.1044 0.314227 16.3825L11.6111 23.8825C11.7264 23.959 11.8616 23.9998 12 23.9998C12.1384 23.9998 12.2736 23.959 12.3889 23.8825L23.6858 16.3825C24.1047 16.1043 24.1047 15.489 23.6858 15.2109Z"
                            fill="currentColor"
                            />
                            <path
                            opacity="0.4"
                            d="M23.6858 11.414L22.9798 10.9453L13.1667 17.4603C12.8198 17.6906 12.4164 17.8124 12 17.8124C11.5836 17.8124 11.1801 17.6906 10.8333 17.4603L1.02016 10.9454L0.314227 11.414C-0.104742 11.6922 -0.104742 12.3075 0.314227 12.5856L11.6111 20.0856C11.7264 20.1621 11.8616 20.2029 12 20.2029C12.1384 20.2029 12.2736 20.1621 12.3889 20.0856L23.6858 12.5856C24.1047 12.3075 24.1047 11.6922 23.6858 11.414Z"
                            fill="currentColor"
                            />
                            <path
                            d="M0.314227 8.7889L11.6111 16.2889C11.7264 16.3654 11.8616 16.4062 12 16.4062C12.1384 16.4062 12.2736 16.3654 12.3889 16.2889L23.6858 8.7889C24.1047 8.51074 24.1047 7.89551 23.6858 7.61735L12.3889 0.11735C12.2736 0.040821 12.1384 0 12 0C11.8616 0 11.7264 0.040821 11.6111 0.11735L0.314227 7.61735C-0.104742 7.89546 -0.104742 8.51074 0.314227 8.7889ZM15.6212 10.701C15.4064 11.0245 14.97 11.1126 14.6465 10.8979L12 9.14084L9.35346 10.8979C9.02993 11.1126 8.59357 11.0245 8.37879 10.701C8.16401 10.3774 8.25213 9.94108 8.57566 9.7263L11.6111 7.7111C11.7264 7.63457 11.8616 7.59375 12 7.59375C12.1384 7.59375 12.2736 7.63457 12.3889 7.7111L15.4243 9.7263C15.7478 9.94108 15.8359 10.3774 15.6212 10.701ZM5.7162 7.82782L11.6111 3.91423C11.7263 3.8377 11.8616 3.79688 12 3.79688C12.1383 3.79688 12.2736 3.8377 12.3889 3.91423L18.2837 7.82782C18.6072 8.0426 18.6954 8.47896 18.4806 8.80249C18.2658 9.12602 17.8294 9.21415 17.5059 8.99937L12 5.34396L6.49399 8.99937C6.17046 9.21415 5.7341 9.12598 5.51932 8.80249C5.30454 8.47901 5.39271 8.0426 5.7162 7.82782Z"
                            fill="currentColor"
                            />
                        </g>
                        </svg>
                    </div>
                )}
                  <div className="text-white">
                        <span className="text-[15px] font-semibold">{selected.name}</span>
                        <span className="block text-[10px] font-light">
                            {selected.platform && (
                                <span className="block text-[10px] font-light">{selected.tagline}</span>
                            )}
                            {selected.pattern && (
                                <span className="block text-[10px] font-light">Filter by <b className="font-semibold">Screen Pattern</b></span>
                            )}
                            {selected.category && (
                                <span className="block text-[10px] font-light">Filter by <b className="font-semibold">App Category</b></span>
                            )}
                            
                        </span>
                  </div>
              </div>
              <Link
                  className="min-w-fit h-full p-2  bg-slate-900 rounded-xl flex flex-col justify-between relative border-transparent border-2 hover:border-orange-500"
                  href={'#'}
              >
                  <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 absolute right-2"
                  preserveAspectRatio="none"
                  >
                  <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.30834 2.3103C1.33203 3.2866 1.33203 4.85795 1.33203 8.00065C1.33203 11.1433 1.33203 12.7147 2.30834 13.691C3.28465 14.6673 4.856 14.6673 7.9987 14.6673C11.1414 14.6673 12.7128 14.6673 13.689 13.691C14.6654 12.7147 14.6654 11.1433 14.6654 8.00065C14.6654 4.85795 14.6654 3.2866 13.689 2.3103C12.7128 1.33398 11.1414 1.33398 7.9987 1.33398C4.856 1.33398 3.28465 1.33398 2.30834 2.3103ZM8.83203 4.66732C8.83203 4.94346 9.0559 5.16732 9.33203 5.16732H10.1249L8.64516 6.6471C8.4499 6.84238 8.4499 7.15892 8.64516 7.35418C8.84043 7.54945 9.15696 7.54945 9.35223 7.35418L10.832 5.87442V6.66732C10.832 6.94345 11.0559 7.16732 11.332 7.16732C11.6082 7.16732 11.832 6.94345 11.832 6.66732V4.66732C11.832 4.39118 11.6082 4.16732 11.332 4.16732H9.33203C9.0559 4.16732 8.83203 4.39118 8.83203 4.66732ZM7.35223 9.35419C7.5475 9.15892 7.5475 8.84238 7.35223 8.64712C7.15696 8.45185 6.84043 8.45185 6.64514 8.64712L5.16536 10.1269V9.33398C5.16536 9.05785 4.9415 8.83398 4.66536 8.83398C4.38922 8.83398 4.16536 9.05785 4.16536 9.33398V11.334C4.16536 11.6101 4.38922 11.834 4.66536 11.834H6.66536C6.9415 11.834 7.16536 11.6101 7.16536 11.334C7.16536 11.0579 6.9415 10.834 6.66536 10.834H5.87247L7.35223 9.35419Z"
                      fill="#F1F5F9"
                  />
                  </svg>
                  <p className="w-[80%] text-[10px] font-medium text-left text-white">
                  Open Application
                  </p>
              </Link>
          </div>
          <div className='flex space-x-2 overflow-x-scroll px-2 pt-2 scrollbar-hide'>
              <BlurImage className='rounded-xl w-[20%]' platform={1} src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application//screens/78/ef198f6c-0ad0-4b18-9999-4002d84ae278.png'} />
              <BlurImage className='rounded-xl w-[20%]' platform={1} src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application//screens/78/ef198f6c-0ad0-4b18-9999-4002d84ae278.png'} />
              <BlurImage className='rounded-xl w-[20%]' platform={1} src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application//screens/78/ef198f6c-0ad0-4b18-9999-4002d84ae278.png'} />
              <BlurImage className='rounded-xl w-[20%]' platform={1} src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application//screens/78/ef198f6c-0ad0-4b18-9999-4002d84ae278.png'} />
              <BlurImage className='rounded-xl w-[20%]' platform={1} src={'https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application//screens/78/ef198f6c-0ad0-4b18-9999-4002d84ae278.png'} />
          </div>
      </div>
    )
  }
  