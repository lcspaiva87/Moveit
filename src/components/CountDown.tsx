import { useState, useEffect, useContext } from 'react';
import { ChallensContext } from '../contexts/ChallensContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/CountDown.module.css';

let countdownTimeout: NodeJS.Timeout;
export function CountDown() {
   
        const { 
            minutes,
            seconds, 
            hastFinished , 
            IsActive,
            startCountDown,
            resetCountDown,
            
        } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


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