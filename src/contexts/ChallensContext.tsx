import { match } from 'assert';
import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;

}
interface ChallensContextData {
    level: number;
    currentExperience: number;
    challegesCompleted: number;
    activeChallegen: Challenge;
    levelUp: () => void;
    startNewChallege: () => void;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenge: () => void;
}
interface ChallegesProviderProps {
    children: ReactNode;
}

export const ChallensContext = createContext({} as ChallensContextData);
export function ChallegesProvider({ children }: ChallegesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challegesCompleted, setChallegesCompleted] = useState(0);
    const [activeChallegen, setActiveChallegen] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);
    function levelUp() {
        setLevel(level + 1);
    }
    function startNewChallege() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
    
        setActiveChallegen(challenge)
    
        new Audio('/notification.mp3').play()
    
        if (Notification.permission === 'granted')
          new Notification('Novo Desafio 🎉;', {
            body: `Valendo ${challenge.amount} xp`
          })
      }
    
    function resetChallenge() {
        setActiveChallegen(null);
    }
    function completeChallenge() {
        if (!activeChallegen) {
            return;
        }
        const { amount } = activeChallegen;
        let finalExperience = currentExperience + amount;

        if (finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();

        }
        setCurrentExperience(finalExperience);
        setActiveChallegen(null);
        setChallegesCompleted(challegesCompleted + 1);
    }
    return (
        <ChallensContext.Provider
            value={{
                level,
                currentExperience,
                challegesCompleted,
                levelUp,
                startNewChallege,
                activeChallegen,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
            }}
        >
            {children}
        </ChallensContext.Provider>
    )
}