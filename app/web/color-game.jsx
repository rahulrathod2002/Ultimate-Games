import React from 'react';
import WebGameScreen from '../../src/web/WebGameScreen';
import { webGames } from '../../src/web/webGames';

const ColorGame = () => <WebGameScreen config={webGames.colorGame} />;

export default ColorGame;
