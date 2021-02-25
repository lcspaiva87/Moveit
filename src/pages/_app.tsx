import '../styles/global.css';

import { ChallegesProvider } from '..//contexts/ChallensContext';
import { useState } from 'react';
import { CountdownProvider } from '../contexts/CountdownContext';
function MyApp({ Component, pageProps }) {



  return (
    <ChallegesProvider>
        <Component {...pageProps} />
    </ChallegesProvider>


  )
}

export default MyApp
