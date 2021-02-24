import { useContext } from 'react';
import { ChallensContext } from '../contexts/ChallensContext';
import styles from '../styles/components/CompletedChallenges.module.css';
export function CompletedChallenges(){
    const{challegesCompleted} =useContext(ChallensContext);
    return(
        <div className={styles.CompletedChallengesContainer}>
            <span>Desafios Completos</span>
            <span>{challegesCompleted}</span>
        </div>
    )
}