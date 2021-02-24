import { match } from 'assert';
import { createContext, useState, ReactNode } from 'react';
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
    function levelUp() {
        setLevel(level + 1);
    }
    function startNewChallege() {
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengesIndex];
        setActiveChallegen(challenge);
    }
    function resetChallenge() {
        setActiveChallegen(null);
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
            }}
        >
            {children}
        </ChallensContext.Provider>
    )
}