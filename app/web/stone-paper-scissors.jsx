import React from 'react';
import WebGameScreen from '../../src/web/WebGameScreen';
import { webGames } from '../../src/web/webGames';

const StonePaperScissors = () => <WebGameScreen config={webGames.stonePaperScissors} />;

export default StonePaperScissors;
