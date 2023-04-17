import useDebounce from '@/lib/debounce';
import { createContext, useContext, useEffect, useState } from 'react';

interface DialogState {
    visible: boolean,
    times: number,
    counter: number,
    setTimes: (times) => void,
    setIncremental: (incremental) => void,
    setVisible: (visible) => void,
}

const defaultState: DialogState = {
    visible: false,
    times: 0,
    counter: 0,
    setTimes: () => { },
    setIncremental: () => { },
    setVisible: () => { },

};

const DialogContext = createContext<DialogState>(
    defaultState
);


export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const baseCounter = 5;
    const [times, setTimes] = useState<number>(
        parseInt(localStorage.getItem('dialogTimes') || '1', 10)
    );
    const [incremental, setIncremental] = useState<boolean>(true)
    const [counter, setCounter] = useState<number>(baseCounter)
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        localStorage.setItem('dialogTimes', times.toString());
        if (times > 0) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [times]);

    useEffect(() => {
        if (incremental) {
            const group = Math.floor(times / 3);
            const additionalTime = 5000 * group;
            const newCounter = baseCounter + additionalTime;

            // Limit counter to a maximum of 30
            if (newCounter > 30000) {
                setCounter(30000);
            } else {
                setCounter(newCounter);
            }
        }
    }, [incremental, times]);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (visible && counter > 0) {
            timer = setTimeout(() => {
                setCounter((prevCounter) => prevCounter - 1000);
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
                times,
                counter,
                setTimes,
                setIncremental,
                setVisible,
            }}
        >
            {children}
        </DialogContext.Provider>
    );
};

export const useDialog = () => useContext(DialogContext);