import { useContext } from 'react';
import { ChallensContext } from '../contexts/ChallensContext';
import styles from '../styles/components/ExperienceBar.module.css';
export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallensContext);

    const porcentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;
    return (
        <header className={styles.ExperienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${porcentToNextLevel}%` }} />
                <span className={styles.currentExperience} style={{ left: `${porcentToNextLevel}%` }}>{currentExperience} xp</span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}