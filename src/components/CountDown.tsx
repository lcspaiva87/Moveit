import { useState, useEffect, useContext } from 'react';
import { ChallensContext } from '../contexts/ChallensContext';
import styles from '../styles/components/CountDown.module.css';

let countdownTimeout: NodeJS.Timeout;
export function CountDown() {
    const{ startNewChallege} =  useContext(ChallensContext);
    const [time, setTime] = useState(0.1 * 60);
    const [IsActive, setIsActive] = useState(false);
    const [hastFinished, setHashFinished] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountDown() {
        setIsActive(true);
    }
    function resetCountDown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
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


    return (
        <div>
            <div className={styles.CountDownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            {hastFinished ? (
                <button
                    disabled
                    className={styles.CountDownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                    <>
                        { IsActive ? (
                            <button
                                type="button"
                                className={`${styles.CountDownButton} ${styles.CountDownButtonActive}`}
                                onClick={resetCountDown}
                            >
                                Abandonar ciclo
                            </button>
                        ) : (
                                <button
                                    type="button"
                                    className={styles.CountDownButton}
                                    onClick={startCountDown}
                                > 
                                    Iniciar ciclo
                                </button>
                            )
                        }
                    </>
                )}

        </div>
    )
}