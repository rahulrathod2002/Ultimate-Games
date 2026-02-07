import React from 'react';
import WebGameScreen from '../../src/web/WebGameScreen';
import { webGames } from '../../src/web/webGames';

const Mcq = () => <WebGameScreen config={webGames.mcq} />;

export default Mcq;
