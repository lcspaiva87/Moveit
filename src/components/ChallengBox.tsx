import { useContext } from 'react';
import { ChallensContext } from '../contexts/ChallensContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengBox.module.css';

export function ChallengBox() {
    const { activeChallegen, resetChallenge, completeChallenge } = useContext(ChallensContext);
    const { resetCountDown } = useContext(CountdownContext);

    function handleChallengeSucceeded(){
        completeChallenge();
        resetCountDown();
    }
    function handleChallengeFailed() {
        resetChallenge();
        resetCountDown();
    }
    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallegen ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallegen.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallegen.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallegen.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                            </button>

                        <button
                            type="button"
                            className={styles.challengeSucceededButton}
                            onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Finalizando um ciclo para receber um novo desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level up" />
                     Avance de level completando desafios
                 </p>
                    </div>
                )
            }
        </div >
    )
}