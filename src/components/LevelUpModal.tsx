
import { useContext } from 'react';
import { ChallensContext } from '../contexts/ChallensContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
    const {level,closeLevelModal} = useContext(ChallensContext);
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>

                <button type="button" onClick={closeLevelModal}> 
                    <img src="/icons/close.svg" alt="Fechar Modal"/>
                </button>
            </div>
        </div>
    )
}