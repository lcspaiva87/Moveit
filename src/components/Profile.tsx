import { useContext } from 'react';
import { ChallensContext } from '../contexts/ChallensContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallensContext);
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/lcspaiva87.png" alt="" />
            <div>
                <strong>
                    Lucas
                </strong>

                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}