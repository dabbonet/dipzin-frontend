import { getUser } from '@/lib/auth';
import { createContext, useContext, useEffect, useState } from 'react';



const DialogContext = createContext(null);


export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const baseCounter = 5;
    const [times, setTimes] = useState<number>(+sessionStorage.getItem('times') || 0);
    const [incremental, setIncremental] = useState<boolean>(false)
    const [counter, setCounter] = useState<number>(baseCounter)
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleNoAuth, setVisibleNoAuth] = useState<boolean>(false);


    useEffect(() => {
        async function checkIfUserAuthenticated() {
            const user = await getUser();
            if (!user) {
                setVisibleNoAuth(true)
            }
        }
        checkIfUserAuthenticated();
    },[])


    // Change visibility based on times
    useEffect(() => {
        if (times > 0) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [times]);


    // If incremental set/change calc new counter value
    useEffect(() => {
        if (incremental) {
            const group = Math.floor(times / 3);
            const additionalTime = 5 * group;
            const newCounter = baseCounter + additionalTime;

            // Limit counter to a maximum of 30
            if (newCounter > 30) {
                setCounter(30);
            } else {
                setCounter(newCounter);
            }
        }
    }, [incremental, times]);


    // Control visability of the dialog based on the counter time.
    useEffect(() => {

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
    }, [visible, counter]);

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
            }}
        >
            {children}
        </DialogContext.Provider>
    );
};

export const useDialog = () => useContext(DialogContext);