'use client'
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';




const DialogContext = createContext(null);



export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const baseCounter = 5;
    const [times, setTimes] = useState<number>(0);
    const [incremental, setIncremental] = useState<boolean>(false)
    const [counter, setCounter] = useState<number>(baseCounter)
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleNoAuth, setVisibleNoAuth] = useState<boolean>(false);
    const router = useRouter()



    useEffect(() => {
        if (times > 0) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [times]);


    useEffect(() => {
        if (!incremental) {
            let timer: NodeJS.Timeout | undefined;
            if (visible && counter > 0) {
                timer = setTimeout(() => {
                    setCounter((prevCounter) => prevCounter - 1);
                }, 1000);
            } else if (counter === 0) {
                setVisible(false);
            }
    
            return () => {
                if (timer) {
                    clearTimeout(timer);
                }
            };
        }
    }, [visible, counter]);
    
    const navigateToRoute = ({link})=>{
        setVisible(true)
        setTimeout(() => {
           router.push(link) 
        },5000);
    }

    return (
        <DialogContext.Provider
            value={{
                visible,
                setVisible,
                visibleNoAuth,
                setVisibleNoAuth,
                times,
                counter,
                setCounter,
                setTimes,
                setIncremental,
                navigateToRoute
            }}
        >
            {children}
        </DialogContext.Provider>
    );
};

export const useDialog = () => useContext(DialogContext);