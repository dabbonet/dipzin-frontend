import { createContext, useContext, useEffect, useState } from 'react';



const DialogContext = createContext(
    null
);


export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const baseCounter = 5;
    const [times, setTimes] = useState<number>(0);
    const [incremental, setIncremental] = useState<boolean>(false)
    const [counter, setCounter] = useState<number>(baseCounter)
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleNoAuth, setVisibleNoAuth] = useState<boolean>(false);



    useEffect(() => {
        if (times > 0) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [times]);



    useEffect(() => {
        if (incremental) {
            const group = Math.floor(times / 3);
            const additionalTime = 5 * group;
            const newCounter = baseCounter + additionalTime;


            if (newCounter > 30) {
                setCounter(30);
            } else {
                setCounter(newCounter);
            }
        }
    }, [incremental, times]);



    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (visible && counter > 0) {
            timer = setTimeout(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, counter * 1000);
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
                setTimes,
                setIncremental,
            }}
        >
            {children}
        </DialogContext.Provider>
    );
};

export const useDialog = () => useContext(DialogContext);