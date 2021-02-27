import { match } from 'assert';
import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';
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
    closeLevelModal: () => void;
}
interface ChallegesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience:number;
    challegesCompleted:number;
}


export const ChallensContext = createContext({} as ChallensContextData);
export function ChallegesProvider({ 
    children,
    ...rest
 }: ChallegesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.challegesCompleted ?? 0);
    const [challegesCompleted, setChallegesCompleted] = useState(rest.currentExperience ?? 0);
    const [activeChallegen, setActiveChallegen] = useState(null);
    const [isLevelUpModalOpen,setisLevelUpModalOpen] = useState(false)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(()=>{
        Cookies.set('level',String(level));
        Cookies.set('currentExperience',String(currentExperience));
        Cookies.set('challegesCompleted',String(challegesCompleted));
    },[level,currentExperience,challegesCompleted]);

    useEffect(()=>{

    },[]);



    function levelUp() {
        setLevel(level + 1);
        setisLevelUpModalOpen(true);
    }
    function closeLevelModal(){
        setisLevelUpModalOpen(false);
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
                closeLevelModal,
            }}
        >
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}

         
        </ChallensContext.Provider>
    )
}