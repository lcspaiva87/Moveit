import '../styles/global.css';

import { ChallegesProvider} from '..//contexts/ChallensContext';
import { useState } from 'react';
function MyApp({ Component, pageProps }) {



  return (
    <ChallegesProvider>
      <Component {...pageProps} />
    </ChallegesProvider>


  )
}

export default MyApp
