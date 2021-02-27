import{createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { ChallensContext } from './ChallensContext';

interface CountdownContextData{
    minutes:number;
    seconds: number;
    hastFinished:boolean;
    IsActive:boolean;
    startCountDown:() => void;
    resetCountDown:() => void;
}

export const CountdownContext = createContext({} as CountdownContextData)
let countdownTimeout: NodeJS.Timeout;
interface CountdownProviderProps {
    children: ReactNode;
}

export function CountdownProvider({children}:CountdownProviderProps){
    const{ startNewChallege} =  useContext(ChallensContext);
    const [time, setTime] = useState(25 * 60);
    const [IsActive, setIsActive] = useState(false);
    const [hastFinished, setHashFinished] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    function startCountDown() {
        setIsActive(true);
    }
    function resetCountDown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
        setHashFinished(false);
    }

    useEffect(() => {
        if (IsActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (IsActive && time === 0) {
            setHashFinished(true);
            setIsActive(false);
            startNewChallege();
            

        }
    }, [IsActive, time])
    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hastFinished,
            IsActive,
            startCountDown,
            resetCountDown,
        }}>
            {children}
        </CountdownContext.Provider>

    )
}
