
import React from 'react';
import { GetServerSideProps } from 'next';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';
import { ChallengBox } from '../components/ChallengBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallegesProvider } from '../contexts/ChallensContext';

interface Homeprops{
  level: number;
  currentExperience:number;
  challegesCompleted:number;
}
export default function Home(props: Homeprops) {
  return (
    <ChallegesProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challegesCompleted={props.challegesCompleted}>
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <CountDown />
            </div>

            <div>
              <ChallengBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallegesProvider>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challegesCompleted } = ctx.req.cookies;
  return {

    props: {

      level:Number(level),
      currentExperience:Number(currentExperience),
      challegesCompleted:Number(challegesCompleted)

    }
  }
}